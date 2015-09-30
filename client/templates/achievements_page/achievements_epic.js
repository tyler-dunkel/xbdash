Template.topEpicAchievements.created = function() {
    this.subscribe('topEpicAchievements');
}

Template.topEpicAchievements.helpers({
    achievementsPresent: function() {
        var achievements = xbdAchievements.find({
            userPercentage: { $gte: 11, $lte: 30 }
        }).count();
        if (achievements > 0) {
            return true;
        }
        return false;
    },
    topEpicAchievements: function() {
        var achievements = xbdAchievements.find({
            userPercentage: { $gte: 11, $lte: 30 }
        }, { sort: { userPercentage: -1 }, limit: 10 });
        if (achievements) {
            return achievements;
        }
    },
    gameName: function() {
        var xbdGame = xbdGames.findOne({ _id: this.gameId });
        if (xbdGame && xbdGame.name) {
            return xbdGame.name;
        }
        return;
    },
    gameSlug: function() {
        var xbdGame = xbdGames.findOne({ _id: this.gameId });
        if (xbdGame && xbdGame.slug) {
            return xbdGame.slug;
        }
        return;
    },
    achievementImage: function () {
        var image = "/img/achievement-default.jpg";
        if (this.mediaAssets) {
            image = this.mediaAssets;
        }
        return image;
    },
    imageClass: function () {
        var xbdGame = xbdGames.findOne({ _id: this.gameId });
        var imgClass = "img-full";
        if (xbdGame.platform === 'Xenon') {
            imgClass = "img-X";
        }
        return imgClass;
    },
    achievementClass: function () {
        var userPercentage = this.userPercentage;
        var achievementClass = "xbd";
        if (userPercentage >= 11 && userPercentage <= 30) {
            achievementClass = "epic";
        }
        return achievementClass;
    },
    trophyClass: function () {
        var userPercentage = this.userPercentage;
        var trophyClass = "xbd";
        if (userPercentage >= 11 && userPercentage <= 30) {
            trophyClass = "star";
        }
        return trophyClass;
    }
});