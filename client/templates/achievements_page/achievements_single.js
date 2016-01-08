Template.achievementsSinglePage.created = function() {
}

Template.achievementsSinglePage.helpers({
    achievementClass: function () {
        var userPercentage = this.userPercentage;
        var achievementClass = "xbd";
        if (userPercentage >= 0 && userPercentage <= 10) {
            achievementClass = "legendary";
        }
        if (userPercentage >= 11 && userPercentage <= 25) {
            achievementClass = "epic";
        }
        if (userPercentage >= 26 && userPercentage <= 50) {
            achievementClass = "rare";
        }
        if (userPercentage >= 51 && userPercentage <= 100) {
            achievementClass = "common";
        }
        return achievementClass;
    },
    trophyClass: function () {
        var userPercentage = this.userPercentage;
        var trophyClass = "xbd";
        if (userPercentage >= 0 && userPercentage <= 10) {
            trophyClass = "trophy";
        }
        if (userPercentage >= 11 && userPercentage <= 25) {
            trophyClass = "star";
        }
        if (userPercentage >= 26 && userPercentage <= 50) {
            trophyClass = "bullseye";
        }
        if (userPercentage >= 51 && userPercentage <= 100) {
            trophyClass = "unlock";
        }
        return trophyClass;
    },
    achievement: function () {
        var slug = Router.current().params.slug;
        return xbdAchievements.findOne({ slug: slug });
    },
    game: function() {
        return xbdGames.findOne({ _id: this.gameId });
    },
    ifXenon: function () {
        var gameD = xbdGames.findOne({ _id: this.gameId });
        if (gameD.platform === 'Xenon') {
            return 'img-x360';
        }
    },
    achievementImage: function () {
        var image = "/img/achievement-default.jpg";
        if (this.mediaAssets) {
            image = "http://res.cloudinary.com/xbdash/image/fetch/c_fit,w_1366,h_768/" + encodeURIComponent(this.mediaAssets);
        }
        return image;
    }
});

Template.achievementsSinglePage.events({
});

Tracker.autorun(function() {
});