Template.overallRanks.created = function() {
	this.subscribe('overallRanks');
}

Template.overallRanks.helpers({
	getCurrentUserOverallRank: function() {
		var user = Meteor.user();
		var getCurrentUserOverallRank = userLeaderboards.findOne({ userId: user._id });
		return getCurrentUserOverallRank.overallRank;
	},
	getCurrentUserImage: function() {
		var user = Meteor.user();
		var gamerImage = '/img/gamerpic-default.jpg';
		if (user && user.gamercard && user.gamercard.gamerpicLargeSslImagePath) {
			gamerImage = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_64,h_64/" + encodeURIComponent(user.gamercard.gamerpicLargeSslImagePath);
		}
		return gamerImage;
	},
	getCurrentUser: function() {
		return Meteor.user().gamercard.gamertag;
	},
	getCurrentUserGamerscore: function() {
		return Meteor.user().gamercard.gamerscore;
	},
	overallLB: function() {
		return userLeaderboards.find({ overallRank: {$gt: 0 } }, {
			sort: { overallRank: 1 },
			limit: 50
		});
	},
	getUserImage: function() {
		var user = Meteor.users.findOne({ _id: this.userId });
		var defaultGamerImage = '/img/gamerpic-default.jpg';
		if (user && user.gamercard && user.gamercard.gamerpicLargeSslImagePath) {
			defaultGamerImage = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_64,h_64/" + encodeURIComponent(user.gamercard.gamerpicLargeSslImagePath);
		}
		return defaultGamerImage;
	},
	getUser: function() {
		var user = Meteor.users.findOne({ _id: this.userId });
		return user.gamercard.gamertag;
	},
	getGamerscore: function() {
		var user = Meteor.users.findOne({ _id: this.userId });
		return user.gamercard.gamerscore;
	}
});