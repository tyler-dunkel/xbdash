 Template.dailyRanks.created = function() {
	this.subscribe('dailyRanks');
}

Template.dailyRanks.helpers({
	getCurrentUserDailyRank: function() {
		var user = Meteor.user();
		var getCurrentUserDailyRank = userLeaderboards.findOne({ userId: user._id });
		return getCurrentUserDailyRank.dailyRank.rank;
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
	getCurrentUserGamerscoreCount: function() {
		var user = Meteor.user();
		var getCurrentUserGamerscoreCount = userLeaderboards.findOne({ userId: user._id });
		return getCurrentUserGamerscoreCount.dailyRank.value;
	},
	dailyLB: function() {
		return userLeaderboards.find({
			'dailyRank.value': { $gt: 1 }
		}, {
			sort: { 'dailyRank.rank': 1 },
			limit: 50
		});
	},
	checkForLB: function() {
		var count = userLeaderboards.find({ 'dailyRank.rank': { $gte: 1 } }).count();
		if (count > 0) return true;
		return false;
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
		var user = userLeaderboards.findOne({ userId: this.userId });
		return user.dailyRank.value;
	}
});