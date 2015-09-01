Template.dashboardAside.created = function() {
    this.subscribe('dashboardStatsCompletedAchievements');
    this.subscribe('dashboardStatsTotalAchievements');
    this.subscribe('dashboardStatsCompletedGames');
    this.subscribe('dashboardStatsTotalGames');
}

Template.dashboardAside.rendered = function() {
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
        if (Template.instance().subscriptionsReady()) {
            var userId = Meteor.userId();
            var totalGames = dashboardStatsTotalGames.findOne({ _id: userId }).gameCount;
            return numberFormatter(totalGames);
        }
    }
});