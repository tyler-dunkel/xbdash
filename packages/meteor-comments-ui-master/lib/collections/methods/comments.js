const noOptOptions = {
  validate: false,
  filter: false,
  getAutoValues: false,
  removeEmptyStrings: false
};

/**
 * Modify replies with a callback in a nested array.
 *
 * @param {Array} nestedArray
 * @param {Array} position Array of numbers with indexes throughout the reply tree.
 * @param {Function} callback
 */
function modifyNestedReplies(nestedArray, position, callback) {
  const currentPos = position.shift();

  if (nestedArray[currentPos]) {
    if (position.length && nestedArray[currentPos] && nestedArray[currentPos].replies) {
      modifyNestedReplies(nestedArray[currentPos].replies, position, callback);
    } else {
      callback(nestedArray, currentPos);
    }
  }
}

/**
 * Call a meteor method with anonymous user id if there is as the last argument.
 *
 * @param {String} methodName
 * @param {Array} methodArgs
 */
function callWithAnonUserData(methodName, ...methodArgs) {
  const anonUserData = userService.isAnonymous() ? userService.getUserData() : {};
  Meteor.apply(methodName, [...methodArgs, anonUserData]);
}

/**
 * Return a mongodb style field descriptor
 *
 * e.g "replies.0.replies.1" which points at the second reply of the first reply.
 *
 * @param {undefined|Array} position
 *
 * @return {String}
 */
function getMongoReplyFieldDescriptor(position) {
  if (!position) {
    return '';
  }

  const descriptorWithLeadingDot = _.reduce(position, function (descriptor, positionNumber) {
    return `${descriptor}replies.${positionNumber}.`;
  }, '');

  return descriptorWithLeadingDot.substr(0, descriptorWithLeadingDot.length - 1);
}

Meteor.methods({
  'comments/add': function (referenceId, content, anonUserData) {
    check(referenceId, String);
    check(content, String);

    userService.verifyAnonUserData(anonUserData);
    const userId = this.userId || anonUserData._id;

    content = content.trim();

    if (userId && content) {
      CommentsCollection.insert({
          referenceId,
          content,
          userId,
          createdAt: (new Date()),
          likes: [],
          replies: [],
          isAnonymous: !!anonUserData._id,
          media: mediaService.getMediaFromContent(content)
      });
    }
  },
  'comments/edit': function (documentId, newContent, anonUserData) {
    check(documentId, String);
    check(newContent, String);

    userService.verifyAnonUserData(anonUserData);
    const userId = this.userId || anonUserData._id;

    newContent = newContent.trim();

    if (!userId || !newContent) {
      return;
    }

    CommentsCollection.update(
      { _id: documentId, userId },
      { $set: { content: newContent, likes: [], media: mediaService.getMediaFromContent(newContent) } }
    );
  },
  'comments/remove': function (documentId, anonUserData) {
    check(documentId, String);

    userService.verifyAnonUserData(anonUserData);
    const userId = this.userId || anonUserData._id;

    CommentsCollection.remove({ _id: documentId, userId });
  },
  'comments/like': function (documentId, anonUserData) {
    check (documentId, String);

    userService.verifyAnonUserData(anonUserData);
    const userId = this.userId || anonUserData._id;

    if (!userId) {
      return;
    }

    if (CommentsCollection.findOne({ _id: documentId, likes: { $in: [userId] } })) {
      CommentsCollection.update({ _id: documentId }, { $pull: { likes: userId } }, noOptOptions);
    } else {
      CommentsCollection.update({ _id: documentId }, { $push: { likes: userId } }, noOptOptions);
    }
  },
  'comments/reply/add': function (documentId, docScope, content, anonUserData) {
    check(documentId, String);
    check(docScope, Object);
    check(content, String);
    userService.verifyAnonUserData(anonUserData);

    const doc = CommentsCollection.findOne({ _id: documentId }),
      userId = this.userId || anonUserData._id;

    content = content.trim();

    if (!doc || !userId || !content || !Comments.config().replies) {
      return false;
    }

    const reply = {
      replyId: Random.id(),
      content: content,
      userId: userId,
      createdAt: (new Date()),
      replies: [], likes: [],
      lastUpdatedAt: (new Date()),
      isAnonymous: !!anonUserData._id,
      media: mediaService.getMediaFromContent(content)
    };

    check(reply, CommentsCollection.schemas.ReplySchema);


    let fieldDescriptor = 'replies';

    if (docScope.position) {
      fieldDescriptor = getMongoReplyFieldDescriptor(docScope.position) + '.replies';
    }

    const modifier = {
      $push: {
        [fieldDescriptor]: {
          $each: [reply],
          $position: 0
        }
      }
    };

    CommentsCollection.update({ _id: documentId }, modifier, noOptOptions);
  },
  'comments/reply/edit': function (documentId, docScope, newContent, anonUserData) {
    check(documentId, String);
    check(docScope, Object);
    check(newContent, String);

    userService.verifyAnonUserData(anonUserData);

    const doc = CommentsCollection.findOne(documentId),
      userId = this.userId || anonUserData._id;

    newContent = newContent.trim();

    if (!userId || !newContent || !Comments.config().replies) {
      return;
    }

    modifyNestedReplies(doc.replies, docScope.position, function (replies, index) {
      if (replies[index].userId === userId) {
        replies[index].content = newContent;
        replies[index].likes = [];
        replies[index].media = mediaService.getMediaFromContent(newContent);
      }
    });

    CommentsCollection.update({ _id: documentId }, { $set: { replies: doc.replies } }, noOptOptions);
  },
  'comments/reply/like': function (documentId, docScope, anonUserData) {
    check(documentId, String);
    check(docScope, Object);
    userService.verifyAnonUserData(anonUserData);

    const doc = CommentsCollection.findOne({ _id: documentId }),
      userId = this.userId || anonUserData._id;

    if (!userId || !Comments.config().replies) {
      return false;
    }

    modifyNestedReplies(doc.replies, docScope.position, function (replies, index) {
      if (replies[index].likes.indexOf(userId) > -1) {
        replies[index].likes.splice(replies[index].likes.indexOf(userId), 1);
      } else {
        replies[index].likes.push(userId);
      }
    });

    CommentsCollection.update({ _id: documentId }, { $set: { replies: doc.replies }  }, noOptOptions);
  },
  'comments/reply/remove': function (documentId, docScope, anonUserData) {
    check(documentId, String);
    check(docScope, Object);
    userService.verifyAnonUserData(anonUserData);

    const doc = CommentsCollection.findOne({ _id: documentId }),
      userId = this.userId || anonUserData._id;

    if (!userId || !Comments.config().replies) {
      return;
    }

    modifyNestedReplies(doc.replies, docScope.position, function (replies, index) {
      if (replies[index].userId === userId) {
        replies.splice(index, 1);
      }
    });

    CommentsCollection.update({ _id: documentId }, { $set: { replies: doc.replies }  }, noOptOptions);
  },
  'comments/count': function (referenceId) {
    check(referenceId, String);
    return CommentsCollection.find({ referenceId: referenceId }).count();
  }
});

CommentsCollection.methods = {
  add: (referenceId, content) => callWithAnonUserData('comments/add', referenceId, content),
  reply: (documentId, docScope, content) => callWithAnonUserData('comments/reply/add', documentId, docScope, content),
  like: (documentId) => callWithAnonUserData('comments/like', documentId),
  edit: (documentId, newContent) => callWithAnonUserData('comments/edit', documentId, newContent),
  remove: (documentId) => callWithAnonUserData('comments/remove', documentId),
  likeReply: (documentId, docScope) => callWithAnonUserData('comments/reply/like', documentId, docScope),
  editReply: (documentId, docScope, content) => callWithAnonUserData('comments/reply/edit', documentId, docScope, content),
  removeReply: (documentId, docScope) => callWithAnonUserData('comments/reply/remove', documentId, docScope)
};
