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
    }
});