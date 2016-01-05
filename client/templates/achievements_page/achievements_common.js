Template.topCommonAchievements.created = function() {
    this.subscribe('topCommonAchievements');
}

Template.topCommonAchievements.helpers({
    achievementsPresent: function() {
        var achievements = xbdAchievements.find({
            userPercentage: { $gte: 51 }
        }).count();
        if (achievements > 0) {
            return true;
        }
        return false;
    },
    topCommonAchievements: function() {
        var achievements = xbdAchievements.find({
            userPercentage: { $gte: 51 }
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
            image = "http://res.cloudinary.com/xbdash/image/fetch/c_fill,h_64,w_64/" + encodeURIComponent(this.mediaAssets);
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
        if (userPercentage >= 51 && userPercentage <= 100) {
            achievementClass = "common";
        }
        return achievementClass;
    },
    trophyClass: function () {
        var userPercentage = this.userPercentage;
        var trophyClass = "xbd";
        if (userPercentage >= 51 && userPercentage <= 100) {
            trophyClass = "unlock";
        }
        return trophyClass;
    }
});