Template.achievementTemplate.helpers({
    gameName: function() {
        var xbdGame = xbdGames.findOne({ _id: this.gameId });
        return xbdGame.name;
    },
    achievementImage: function () {
        var image = "/img/xboxdash_greenicon.png";
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
        if (this.userPercentage >= 0 && this.userPercentage <= 10) {
            return "a";
        }
        if (this.userPercentage >= 11 && this.userPercentage <= 30) {
            return "b";
        }
        if (this.userPercentage >= 31 && this.userPercentage <= 60) {
            return "c";
        }
        if (this.userPercentage >= 61 && this.userPercentage <= 100) {
            return "d";
        }
    }
});