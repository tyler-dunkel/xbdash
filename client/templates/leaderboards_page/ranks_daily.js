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
	getUser: function() {
		var user = Meteor.user();
		return user.gamercard.gamertag;
	},
	getUserImage: function() {
		var user = Meteor.user();
		var defaultGamerImage = '/img/gamerpic-default.jpg';
		if (user && user.gamercard && user.gamercard.gamerpicLargeSslImagePath) {
			defaultGamerImage = "http://res.cloudinary.com/xbdash/image/fetch/c_fit,w_64,h_64/" + encodeURIComponent(user.gamercard.gamerpicLargeSslImagePath);
		}
		return defaultGamerImage;
	},
	getGamerscore: function() {
		var user = userLeaderboards.findOne({ _id: this.userId });
		return user.dailyRank.value;
	}
});