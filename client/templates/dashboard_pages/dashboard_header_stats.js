var maxGamerscore = 0;
var maxGamerscoreDependency = new Tracker.Dependency;

Template.dashboardHeader.created = function() {
    this.subscribe('dashboardStatsCompletedAchievements');
    this.subscribe('dashboardStatsTotalAchievements');
    this.subscribe('dashboardStatsCompletedGames');
    this.subscribe('dashboardStatsTotalGames');
}

Template.dashboardHeaderStats.helpers({
    isStatsDisabled: function () {
        var user = Meteor.user();
        if (!user || !user.gamertagScanned) {
            return 'disabled hide';
        }
    },
    isDashboardPage: function () {
        if (Router.current().route.getName() === 'home') {
            return 'disabled hide';
        }
    },
    achievementsCompleted: function () {
        var userId = Meteor.userId();
        if (Template.instance().subscriptionsReady()) {
            var achievementsCount = dashboardStatsCompletedAchievements.findOne({
                _id: userId
            }).achievementCount;
            return numberFormatter(achievementsCount);
        }
    },
    totalAchievements: function () {
        var userId = Meteor.userId();
        if (Template.instance().subscriptionsReady()) {
            var totalAchievements = dashboardStatsTotalAchievements.findOne({ _id: userId }).achievementCount;
            return numberFormatter(totalAchievements);
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
    gamesCompleted: function () {
        var userId = Meteor.userId();
        if (Template.instance().subscriptionsReady()) {
            var gamesCount = dashboardStatsCompletedGames.findOne({ _id: userId }).gameCount;
            return numberFormatter(gamesCount);
        }
    },
    totalGames: function () {
        var userId = Meteor.userId();
        if (Template.instance().subscriptionsReady()) {
            var totalGames = dashboardStatsTotalGames.findOne({ _id: userId }).gameCount;
            return numberFormatter(totalGames);
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
    currentGamerscore: function () {
        var user = Meteor.user();
        return numberFormatter(user.profile.gamercard.gamerscore);
    }
});