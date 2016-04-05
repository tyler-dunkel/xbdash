Template.completedGamesRanks.created = function() {
	this.subscribe('completedGames');
}

Template.completedGamesRanks.helpers({
	getCurrentUserGamesRank: function() {
		var user = Meteor.user();
		var getCurrentUserGamesRank = userLeaderboards.findOne({ userId: user._id });
		return getCurrentUserGamesRank.completedGames.rank;
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
	getCurrentUserGamesCount: function() {
		var user = Meteor.user();
		var getCurrentUserGamesCount = userLeaderboards.findOne({ userId: user._id });
		return getCurrentUserGamesCount.completedGames.count;
	},
	completedGamesLB: function() {
		return userLeaderboards.find({
			'completedGames.count': { $gt: 1 }
		}, {
			sort: { 'completedGames.rank': 1 },
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
	}
});