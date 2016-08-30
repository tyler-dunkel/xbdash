var maxGamerscore = 0;
var maxGamerscoreDependency = new Tracker.Dependency;

Template.dashboardStatBoxes.created = function() {
	this.subscribe('dashboardStatsCompletedAchievements');
	this.subscribe('dashboardStatsTotalAchievements');
	this.subscribe('dashboardStatsCompletedGames');
	this.subscribe('dashboardStatsTotalGames');
}

Template.dashboardStatBoxes.rendered = function() {
	$('[data-toggle="tooltip"]').tooltip();
}

Template.dashboardStatBoxes.helpers({
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
	}
});

Template.dashboardStatGs.created = function() {
	var self = this;
	self.autorun(function() {
		self.subscribe('userGamerscoreStats');
	});
	Meteor.call('getMaxGamerscore', function(error, result) {
		if (error) {
			return;
		}
		maxGamerscoreDependency.changed();
		maxGamerscore = result;
	});
}

Template.dashboardStatGs.helpers({
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
	},
	maxGamerscore: function () {
		maxGamerscoreDependency.depend();
		if (maxGamerscore > 0) {
			return numberFormatter(maxGamerscore);
		}
		return "--";
	},
	gamerscorePercentage: function () {
		maxGamerscoreDependency.depend();
		if (maxGamerscore > 0) {
			var user = Meteor.user();
			var currentGamerscore, gamerscorePercentage;
			if (user && user.gamercard && user.gamercard.gamerscore) {
				currentGamerscore = user.gamercard.gamerscore;
				gamerscorePercentage = Math.round(currentGamerscore / maxGamerscore * 100);
			}
			if (user && user.xboxProfile && user.xboxProfile.gamerscore) {
				currentGamerscore = user.xboxProfile.gamerscore;
				gamerscorePercentage = Math.round(currentGamerscore / maxGamerscore * 100);
			}
			return numberFormatter(gamerscorePercentage);

		}
		return '0';
	}
});