var maxGamerscore = 0;
var maxGamerscoreDependency = new Tracker.Dependency;

Template.dashboardHeaderStats.created = function() {
	this.subscribe('dashboardStatsCompletedAchievements');
	this.subscribe('dashboardStatsTotalAchievements');
	this.subscribe('dashboardStatsCompletedGames');
	this.subscribe('dashboardStatsTotalGames');
}

Template.dashboardHeaderStats.helpers({
	achievementsCompleted: function () {
		var userId = Meteor.userId();
		if (Template.instance().subscriptionsReady()) {
			var achievementsCount = dashboardStatsCompletedAchievements.findOne({
				_id: userId
			}).achievementCount;
			return numberFormatter(achievementsCount);
		}
	},
	achievementsPercentage: function () {
		var userId = Meteor.userId();
		if (Template.instance().subscriptionsReady()) {
			var achievementsCount = dashboardStatsCompletedAchievements.findOne({ _id: userId }).achievementCount;
			var totalAchievements = dashboardStatsTotalAchievements.findOne({ _id: userId }).achievementCount;
			var achievementsPercentage = Math.round(achievementsCount / totalAchievements * 100);
			return numberFormatter(achievementsPercentage);
		}
	},
	totalAchievements: function () {
		var userId = Meteor.userId();
		if (Template.instance().subscriptionsReady()) {
			var totalAchievements = dashboardStatsTotalAchievements.findOne({ _id: userId }).achievementCount;
			return numberFormatter(totalAchievements);
		}
	},
	gamesCompleted: function () {
		var userId = Meteor.userId();
		if (Template.instance().subscriptionsReady()) {
			var gamesCount = dashboardStatsCompletedGames.findOne({ _id: userId }).gameCount;
			return numberFormatter(gamesCount);
		}
	},
	gamesPercentage: function () {
		var userId = Meteor.userId();
		if (Template.instance().subscriptionsReady()) {
			var gamesCount = dashboardStatsCompletedGames.findOne({ _id: userId }).gameCount;
			var totalGames = dashboardStatsTotalGames.findOne({ _id: userId }).gameCount;
			var gamesPercentage = Math.round(gamesCount / totalGames * 100);
			return numberFormatter(gamesPercentage);
		}
	},
	totalGames: function () {
		var userId = Meteor.userId();
		if (Template.instance().subscriptionsReady()) {
			var totalGames = dashboardStatsTotalGames.findOne({ _id: userId }).gameCount;
			return numberFormatter(totalGames);
		}
	},
	currentGamerscore: function () {
		var user = Meteor.user();
		var currentGamerscore;
		if (user && user.gamercard && user.gamercard.gamerscore) {
			currentGamerscore = user.gamercard.gamerscore;
		}
		if (user && user.xboxProfile && user.xboxProfile.gamerscore) {
			currentGamerscore = user.xboxProfile.gamerscore;
		}
		return numberFormatter(currentGamerscore);
	}
});