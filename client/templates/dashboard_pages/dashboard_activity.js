Template.recentActivityColumn.helpers({
    gamesList: function () {
        var user = Meteor.user();
        return userGames.find({ userId: user._id, currentGamerscore: { $gt: 1 }}, { sort: { lastUnlock: -1 }, limit: 10 });
    },
    gamesListImage: function () {
        var xbdGame = xbdGames.findOne({ _id: this.gameId });
        var gameDetail = gameDetails.findOne({ gameId: this.gameId });
        var image = "/img/xbdash_greenicon.png";
        if (xbdGame.platform === 'Xenon') {
            gameDetail.gameArt.forEach(function(art) {
                if (art.Purpose === 'BoxArt') {
                    image =  art.Url;
                }
            });
        }
        if (xbdGame.platform === 'Durango') {
            gameDetail.gameArt.forEach(function(art) {
                if (art.Purpose === 'BrandedKeyArt') {
                    image =  art.Url;
                }
            });
        }
        return image;
    },
    gameName: function (userGameId) {
        var game = xbdGames.findOne({ _id: userGameId });
        return game.name;
    },
    percentageComplete: function (gameId, earnedAchievements) {
        var achievementCount = xbdAchievements.find({ gameId: gameId }).count();
        return Math.round(earnedAchievements / achievementCount * 100);
    },
    remainingAchievements: function (gameId) {
        var achievementCount = xbdAchievements.find({ gameId: gameId }).count();
        return achievementCount - this.earnedAchievements;
    }
});