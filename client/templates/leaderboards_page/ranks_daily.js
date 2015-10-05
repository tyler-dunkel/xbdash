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
		var user = Meteor.users.findOne({ _id: this.userId });
		return user.gamercard.gamertag;
	},
	getUserImage: function() {
		var user = Meteor.users.findOne({ _id: this.userId });
		if (user.gamercard.gamerpicLargeSslImagePath) {
			return user.gamercard.gamerpicLargeSslImagePath;
		}
		return '/img/gamerpic-default.jpg';
	},
	getGamerscore: function() {
		var user = userLeaderboards.findOne({ _id: this.userId });
		return user.dailyRank.value;
	}
});