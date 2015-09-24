Template.completedGamesRanks.created = function() {
	this.subscribe('completedGames');
}

Template.completedGamesRanks.helpers({
	completedGamesLB: function() {
		return userLeaderboards.find({
				'completedGames.count': { $gt: 1 }
		}, {
			sort: { 'completedGames.rank': 1 },
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
	}
});