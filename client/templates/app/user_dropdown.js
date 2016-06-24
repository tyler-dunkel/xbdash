Template.userDropdown.created = function() {
	this.subscribe('userNotifications');
}

Template.userDropdown.helpers({
	gamerImage: function () {
		var user = Meteor.user();
		var defaultGamerImage = "/img/gamerpic-default.jpg";
		if (user && user.gamercard && user.gamercard.gamerpicLargeSslImagePath) {
			defaultGamerImage = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_96,h_96/" + encodeURIComponent(user.gamercard.gamerpicLargeSslImagePath);
		}
		if (user && user.xboxProfile) {
			defaultGamerImage =  "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_96,h_96/" + encodeURIComponent(user.xboxProfile.gameDisplayPicRaw);
		}
		return defaultGamerImage;
	},
	notificationChk: function() {
		var count = Notifications.find({userId: Meteor.user()._id, read: false}).count();
		if (count > 0) return true;
		return false;
	},
	notificationCount: function() {
		return Notifications.find({userId: Meteor.user()._id, read: false}).count();
	},
	notifications: function() {
		return Notifications.find({userId: Meteor.user()._id}).fetch();
	},
	unread: function() {
		if (!this.read) {
			return "unread";
		}
	},
	notificationTime: function() {
		return moment(this.createdAt).fromNow();
	}

});

Template.userDropdown.events({
    'click #logout': function(event) {
        event.preventDefault();
        Meteor.logout(function(error){
            if (error) {
                throw new Meteor.Error("Logout failed");
            }
            Router.go('logIn');
        });
    },
    'click .profile-button': function(e) {
        e.preventDefault();
        var user = Meteor.user();
        Router.go('userPage', {gamertagSlug: user.gamertagSlug});
    },
    'click .notification-link': function(e) {
        e.preventDefault();
        var user = Meteor.user();
        Router.go('userPage', {gamertagSlug: user.gamertagSlug});
    },
    'mouseenter .unread': function(e) {
        var self = this;
        Meteor.setTimeout(function() {
            Meteor.call('notificationRead', self._id, function(err) {
            });
        }, 10000);
    },
    'mouseleave .unread': function(e) {
        $(e.currentTarget).removeClass('unread');
    }

});