Template.completedAchievementsRanks.created = function() {
    this.subscribe('completedAchievements');
}

Template.completedAchievementsRanks.helpers({
    getCurrentUserAchievementsRank: function() {
        var user = Meteor.user();
        var getCurrentUserAchievementsRank = userLeaderboards.findOne({ userId: user._id });
        return getCurrentUserAchievementsRank.completedAchievements.rank;
    },
    getCurrentUserImage: function() {
        var user = Meteor.user();
        var gamerImage = '/img/gamerpic-default.jpg';
        if (user && user.gamercard && user.gamercard.gamerpicLargeSslImagePath) {
            gamerImage = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_64,h_64/" + encodeURIComponent(user.gamercard.gamerpicLargeSslImagePath);
        }
        return gamerImage;
    },
    getCurrentUser: function() {
        return Meteor.user().gamercard.gamertag;
    },
    getCurrentUserAchievementsCount: function() {
        var user = Meteor.user();
        var getCurrentUserAchievementsCount = userLeaderboards.findOne({ userId: user._id });
        return getCurrentUserAchievementsCount.completedAchievements.count;
    },
    completedAchievementsLB: function() {
        return userLeaderboards.find({
            'completedAchievements.count': { $gt: 1 }
        }, {
            sort: { 'completedAchievements.rank': 1 },
            limit: 50
        });
    },
    getUserImage: function() {
        var user = Meteor.users.findOne({ _id: this.userId });
        var defaultGamerImage = '/img/gamerpic-default.jpg';
        if (user && user.gamercard && user.gamercard.gamerpicLargeSslImagePath) {
            defaultGamerImage = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_64,h_64/" + encodeURIComponent(user.gamercard.gamerpicLargeSslImagePath);
        }
        return defaultGamerImage;
    },
    getUser: function() {
        var user = Meteor.users.findOne({ _id: this.userId });
        return user.gamercard.gamertag;
    }
});