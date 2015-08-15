Template.achievementSingleComment.created = function() {
	this.subscribe("commentUserImage", this.data.userId);
}

Template.achievementSingleComment.helpers({
	debugger: function () {
		//console.log(this);
	},
	getUser: function (user){
		var user = Meteor.users.findOne({_id: this.userId});
		return user.username;
	},
	getUserImage: function (user) {
		var user = Meteor.users.findOne({_id: this.userId});
		console.log(user.profile.gamercard.gamerpicLargeImagePath);
		return user.profile.gamercard.gamerpicLargeImagePath;
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