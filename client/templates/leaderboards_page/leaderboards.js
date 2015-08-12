Template.leaderboardsApp.rendered = function() {
}

Template.leaderboardsApp.created = function() {
	this.subscribe('completedAchievements');
	this.subscribe('completedGames');
	this.subscribe('maxGamerscore');
}

Template.leaderboardsApp.helpers({
	completedAchievementsLB: function() {
		return completedAchievements.find({}, { sort: { achievementCount: -1 }, limit: 100 });
	},
	completedGamesLB: function() {
		return completedGames.find({}, { sort: { gameCount: -1 }, limit: 100 });
	},
	maxGamerscoreLB: function() {
		return Meteor.users.find({}, { sort: { "profile.gamercard.gamerscore": -1 }, limit: 100 });
	}
});

Template.leaderboardsApp.events({
});

Tracker.autorun(function() {
});