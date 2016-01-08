Template.achievementTemplate.rendered = function() {
    $('.ih-item.square .img .achievements-thumb .achievement-image').error(function() {
        $(this).attr('src', '/img/achievement-default.jpg');
    });
}

Template.achievementTemplate.helpers({
    gameName: function() {
        var xbdGame = xbdGames.findOne({ _id: this.gameId });
        return xbdGame.name;
    },
    achievementImage: function () {
        var image = "/img/achievement-default.jpg";
        if (this.mediaAssets) {
            image = "http://res.cloudinary.com/xbdash/image/fetch/" + encodeURIComponent(this.mediaAssets);
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
    }
});