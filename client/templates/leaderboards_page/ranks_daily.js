Template.dailyRanks.created = function() {
	this.subscribe('dailyRanks');
}

Template.dailyRanks.helpers({
	dailyLB: function() {
		return userLeaderboards.find({
			'dailyRank.value': { $gt: 1 }
		}, {
			sort: { 'dailyRank.rank': 1 },
			limit: 100
		});
	},
	checkForLB: function() {
		var count = userLeaderboards.find({ 'dailyRank.rank': { $gte: 1 } }).count();
		if (count > 0) return true;
		return false;
	},
	getUser: function() {
		var user = Meteor.users.findOne({ _id: this.userId });
		return user.gamercard.gamertag;
	},
	getUserImage: function() {
		var user = Meteor.users.findOne({ _id: this.userId });
		var defaultGamerImage = '/img/gamerpic-default.jpg';
		if (user && user.gamercard && user.gamercard.gamerpicLargeSslImagePath) {
			defaultGamerImage = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_64,h_64/" + encodeURIComponent(user.gamercard.gamerpicLargeSslImagePath);
		}
		return defaultGamerImage;
	},
	getGamerscore: function() {
		var user = userLeaderboards.findOne({ userId: this.userId });
		return user.dailyRank.value;
	}
});