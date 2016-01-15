Template.singleComment.created = function() {
    this.subscribe("commentUserImage", this.data.userId);
}

Template.singleComment.rendered = function() {
    this.$('p').contents().each(function() {
        if (this.nodeType !== 3) {
            return true;
        }

        var matches = this.data.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([\w\-]{10,12})(?:&feature=related)?(?:[\w\-]{0})?/g);
        
        if (matches) {
            matches = matches[0].match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
        } else {
            return;
        }

        if (matches[2].length != 11) {
            return;
        }

        var iframeWrap = '<div class="embed-responsive embed-responsive-16by9"></div>';
        var iframe = $('<iframe class="embed-responsive-item" allowfullscreen />');
        
        iframe.attr('src', function(i, val) {
            return '//www.youtube.com/embed/' + matches[2];
        })
        iframe.insertAfter(this).wrap(iframeWrap);
    });
}

Template.singleComment.helpers({
    debugger: function () {
        console.log(this);
    },
    getUser: function (user){
        var user = Meteor.users.findOne({ _id: this.userId });
        return user.username;
    },
    getUserImage: function (user) {
        var user = Meteor.users.findOne({ _id: this.userId });
        var getUserImage = '/img/gamerpic-default.jpg';
        if (user && user.gamercard && user.gamercard.gamerpicLargeSslImagePath) {
            getUserImage = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_64,h_64/" + encodeURIComponent(user.gamercard.gamerpicLargeSslImagePath);
        }
        return getUserImage;
    },
    take: function (params) {
        var content = Comments.session.get('content');
        if (content[params.hash.key]) {
            return content[params.hash.key];
        }
        return params.hash.default;
    },
    templateIs: function (name) {
        return name === Comments.ui.config().template;
    },
    hasMoreComments: function () {
        return Comments.get(this.id).count() < Comments.session.get(this.id + '_count');
    },
    textarea: function () {
        return Template.commentsTextarea;
    },
    commentId: function () {
        return this._id || this.replyId;
    },
    hasLiked: function () {
        return this.likes.indexOf(Meteor.userId()) > -1;
    },
    isOwnComment: function () {
        return this.userId === Meteor.userId();
    },
    loginAction: function () {
        return Comments.session.get('loginAction');
    },
    addReply: function () {
        var id = this._id || this.replyId;
        return Comments.session.get('replyTo') === id;
    },
    isEditable: function () {
        var id = this._id || this.replyId;
        return Comments.session.get('editingDocument') === id;
    },
    reply: function () {
        if (_.isFunction(this.enhancedReplies)) {
            return this.enhancedReplies();
        } else if (_.isArray(this.enhancedReplies)) {
            return this.enhancedReplies;
        }
    }
});