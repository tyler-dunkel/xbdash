Template.asideHeader.helpers({
    gamerImage: function () {
        var user = Meteor.user();
        var defaultGamerImage = '/img/xboxdash_whiteicon.png';
        if (user && user.gamercard && user.gamercard.gamerpicLargeSslImagePath) {
            defaultGamerImage = "http://res.cloudinary.com/xbdash/image/fetch/c_fit,w_96,h_96/" + encodeURIComponent(user.gamercard.gamerpicLargeSslImagePath);
        }
        return defaultGamerImage;
    },
    chkGamerFalse: function () {
        var user = Meteor.user();
        if (user && user.gamertagScanned) {
            if (user.gamertagScanned.status === 'false') {
                return true;
            }
        }
        return false;
    },
    chkGamerBuilding: function () {
        var user = Meteor.user();
        if (user && user.gamertagScanned) {
            if (user.gamertagScanned.status === 'building'){
                return true;
            }
        }
        return false;
    }
});

// var maxGamerscore = 0;
// var maxGamerscoreDependency = new Tracker.Dependency;

// Template.asideStats.created = function() {
    // this.subscribe('dashboardStatsCompletedAchievements');
    // this.subscribe('dashboardStatsTotalAchievements');
    // this.subscribe('dashboardStatsCompletedGames');
    // this.subscribe('dashboardStatsTotalGames');
// }

// Template.asideHeader.helpers({
    // achievementsCompleted: function () {
    //     var userId = Meteor.userId();
    //     if (Template.instance().subscriptionsReady()) {
    //         var achievementsCount = dashboardStatsCompletedAchievements.findOne({
    //             _id: userId
    //         }).achievementCount;
    //         return numberFormatter(achievementsCount);
    //     }
    // },
    // totalAchievements: function () {
    //     var userId = Meteor.userId();
    //     if (Template.instance().subscriptionsReady()) {
    //         var totalAchievements = dashboardStatsTotalAchievements.findOne({ _id: userId }).achievementCount;
    //         return numberFormatter(totalAchievements);
    //     }
    // },
    // gamesCompleted: function () {
    //     var userId = Meteor.userId();
    //     if (Template.instance().subscriptionsReady()) {
    //         var gamesCount = dashboardStatsCompletedGames.findOne({ _id: userId }).gameCount;
    //         return numberFormatter(gamesCount);
    //     }
    // },
    // totalGames: function () {
    //     var userId = Meteor.userId();
    //     if (Template.instance().subscriptionsReady()) {
    //         var totalGames = dashboardStatsTotalGames.findOne({ _id: userId }).gameCount;
    //         return numberFormatter(totalGames);
    //     }
    // },
    // currentGamerscore: function () {
    //     var user = Meteor.user();
    //     if (Template.instance().subscriptionsReady()) {
    //         return numberFormatter(user.gamercard.gamerscore);
    //     }
    // }
// });