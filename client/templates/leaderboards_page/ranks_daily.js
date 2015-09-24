Template.dailyRanks.created = function() {
	this.subscribe('dailyRank');
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
		return user.profile.gamercard.gamertag;
	},
	getUserImage: function() {
		var user = Meteor.users.findOne({ _id: this.userId });
		if (user.profile.gamercard.gamerpicLargeSslImagePath) {
			return user.profile.gamercard.gamerpicLargeSslImagePath;
		}
		return '/img/gamerpic-default.jpg';
	},
	getGamerscore: function() {
		var user = userLeaderboards.findOne({ _id: this.userId });
		return user.dailyRank.value;
	}
});