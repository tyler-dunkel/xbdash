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
		return user.gamercard.gamertag;
	},
	getUserImage: function() {
		var user = Meteor.user();
		var defaultGamerImage = '/img/gamerpic-default.jpg';
		if (user && user.gamercard && user.gamercard.gamerpicLargeSslImagePath) {
			defaultGamerImage = "http://res.cloudinary.com/xbdash/image/fetch/c_fit,w_64,h_64/" + encodeURIComponent(user.gamercard.gamerpicLargeSslImagePath);
		}
		return defaultGamerImage;
	}
});