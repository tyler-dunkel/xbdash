var maxGamerscore = 0;
var maxGamerscoreDependency = new Tracker.Dependency;

Template.dashboardAside.created = function() {
    this.subscribe('dashboardStatsCompletedAchievements');
    this.subscribe('dashboardStatsTotalAchievements');
    this.subscribe('dashboardStatsCompletedGames');
    this.subscribe('dashboardStatsTotalGames');
}

Template.dashboardAside.helpers({
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
    currentGamerscore: function () {
        var user = Meteor.user();
        if (Template.instance().subscriptionsReady()) {
            return numberFormatter(user.profile.gamercard.gamerscore);
        }
    }
});