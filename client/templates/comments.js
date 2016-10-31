Template.achievementCommentBox.helpers({
	loginAction: function() {
			return Comments.session.get('loginAction');
	},
	textarea: function() {
			return Template.commentsTextarea;
	},
	hasMoreComments: function() {
			return Comments.get(this.id).count() < Comments.session.get(this.id + '_count');
	}
});

Template.newsCommentBox.helpers({
	loginAction: function() {
			return Comments.session.get('loginAction');
	},
	textarea: function() {
			return Template.commentsTextarea;
	},
	hasMoreComments: function() {
			return Comments.get(this.id).count() < Comments.session.get(this.id + '_count');
	}
});