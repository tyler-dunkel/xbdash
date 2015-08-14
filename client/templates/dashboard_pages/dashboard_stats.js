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
        if (Template.instance().subscriptionsReady()) {
            var userId = Meteor.userId();
            var totalGames = dashboardStatsTotalGames.findOne({ _id: userId }).gameCount;
            return numberFormatter(totalGames);
        }
    },
    gamesPercentage: function () {
        if (Template.instance().subscriptionsReady()) {
            var userId = Meteor.userId();
            var gamesCount = dashboardStatsCompletedGames.findOne({ _id: userId }).gameCount;
            var totalGames = dashboardStatsTotalGames.findOne({ _id: userId }).gameCount;
            var gamesPercentage = Math.round(gamesCount / totalGames * 100);
            return numberFormatter(gamesPercentage);
        }
    }
});