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

Template.overallRanks.created = function() {
	this.subscribe('overallRanks');
}

Template.overallRanks.helpers({
	overallLB: function() {
		return userLeaderboards.find({}, {
			sort: { overallRank: 1 },
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
		var user = Meteor.users.findOne({ _id: this.userId });
		return user.profile.gamercard.gamerscore;
	}
});

Template.completedAchievementsRanks.created = function() {
	this.subscribe('completedAchievements');
}

Template.completedAchievementsRanks.helpers({
	completedAchievementsLB: function() {
		return userLeaderboards.find({
			'completedAchievements.count': { $gt: 1 }
		}, {
			sort: { 'completedAchievements.rank': 1 },
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

Tracker.autorun(function() {
});