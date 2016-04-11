Template.commentsSingleComment.helpers(_.extend(defaultCommentHelpers, {
  hasLiked() {
    return this.likes.indexOf(userService.getUserId()) > -1;
  },
  isOwnComment() {
    return this.userId === userService.getUserId();
  },
  addReply() {
    const id = this._id || this.replyId;
    return Comments.session.equals('replyTo', id);
  },
  isEditable() {
    const id = this._id || this.replyId;
    return Comments.session.equals('editingDocument', id);
  },
  mediaContent() {
    return mediaService.getMarkup(this.media);
  },
  reply() {
    if (_.isFunction(this.enhancedReplies)) {
      return this.enhancedReplies();
    } else if (_.isArray(this.enhancedReplies)) {
      return this.enhancedReplies;
    }
  },
  avatarUrl() {
    var user = Meteor.users.findOne(this.userId);
    if (user && user.gamercard && user.gamercard.gamerpicLargeSslImagePath) {
        getUserImage = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_64,h_64/" + encodeURIComponent(user.gamercard.gamerpicLargeSslImagePath);
    }
    return getUserImage || Comments.ui.config().defaultAvatar;
  }
}));
