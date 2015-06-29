Template.achievementTemplate.helpers({
    gameName: function() {
        var gameId = xbdAchievements.findOne({ _id: this.gameId });
        var xbdGame = xbdGames.findOne({ _id: gameId });
        //console.log(xbdGame.name);
        //return xbdGame.name;
    },
    achievementImage: function () {
        var xbdAchievement = xbdAchievements.findOne({ _id: this.gameId });
        var xbdGame = xbdGames.findOne({ _id: this.gameId });
        var image = "/img/xboxdash_greenicon.png";
        //if (xbdGame.platform === 'Xenon' || xbdGame.platform === 'Durango') {
        if (typeof xbdGame !== 'undefined') {
            image = xbdAchievement.mediaAssets;
            console.log(image);
        }
        //}
        return image;
    }
});