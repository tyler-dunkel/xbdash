var maxGamerscore = 0;
var maxGamerscoreDependency = new Tracker.Dependency;

Template.dashboardStatBoxes.created = function() {
    this.subscribe('dashboardStatsCompletedAchievements');
    this.subscribe('dashboardStatsTotalAchievements');
    this.subscribe('dashboardStatsCompletedGames');
    this.subscribe('dashboardStatsTotalGames');
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
    gamesCompleted: function () {
        var userId = Meteor.userId();
        if (Template.instance().subscriptionsReady()) {
            var gamesCount = dashboardStatsCompletedGames.findOne({ _id: userId }).gameCount;
            return numberFormatter(gamesCount);
        }
    },
    currentGamerscore: function () {
        var user = Meteor.user();
        if (Template.instance().subscriptionsReady()) {
            return numberFormatter(user.profile.gamercard.gamerscore);
        }
    },
    totalAchievements: function () {
        var userId = Meteor.userId();
        if (Template.instance().subscriptionsReady()) {
            var totalAchievements = dashboardStatsTotalAchievements.findOne({ _id: userId }).achievementCount;
            return numberFormatter(totalAchievements);
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
    }
});

Template.dashboardStatGs.created = function() {
    var self = this;
    Meteor.call('getMaxGamerscore', function(error, result) {
        if (error) {
            console.log(error);
            return;
        }
        maxGamerscoreDependency.changed();
        maxGamerscore = result;
    });
}

Template.dashboardStatGs.helpers({
    currentGamerscore: function () {
        var user = Meteor.user();
        return numberFormatter(user.profile.gamercard.gamerscore);
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
            var currentGamerscore = user.profile.gamercard.gamerscore;
            var gamerscorePercentage = Math.round(currentGamerscore / maxGamerscore * 100);
            return numberFormatter(gamerscorePercentage);
        }
        return '0';
    }
});