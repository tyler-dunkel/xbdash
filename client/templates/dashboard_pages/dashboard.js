Template.dashboard.rendered = function() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
}

Template.dashboard.events({
});

Template.dashboardApp.helpers({
    achievementsCompleted: function () {
        var achievementsCount = userAchievements.find({ progressState: true }).count();
        return numberFormatter(achievementsCount);
    },
    totalAchievements: function () {
        var totalAchievements = userAchievements.find({}).count();
        return numberFormatter(totalAchievements);
    },
    achievementsPercentage: function () {
        var achievementsCount = userAchievements.find({ progressState: true }).count();
        var totalAchievements = userAchievements.find({}).count();
        var achievementsPercentage = Math.round(achievementsCount / totalAchievements * 100);
        return numberFormatter(achievementsPercentage);
    },
    gamesCompleted: function () {
        var gameCount = 0;
        var userId = Meteor.userId();
        var userGamesFind = userGames.find({ userId: userId });
        userGamesFind.forEach(function(g) {
            var gameId = g.gameId;
            var currentGamerscore = g.currentGamerscore;
            var getGame = xbdGames.findOne({ _id: gameId });
            if (typeof getGame !== 'undefined') {
                var maxGamerscore = getGame.maxGamerscore;
            }
            //console.log(maxGamerscore);
            if ( currentGamerscore === maxGamerscore ) gameCount += 1;
        });
        return numberFormatter(gameCount);
    },
    totalGames: function () {
        var totalGames = userGames.find({}).count();
        return numberFormatter(totalGames);
    },
    gamesPercentage: function () {
        var gameCount = 0;
        var userId = Meteor.userId();
        var userGamesFind = userGames.find({ userId: userId });
        userGamesFind.forEach(function(g) {
            var gameId = g.gameId;
            var currentGamerscore = g.currentGamerscore;
            var getGame = xbdGames.findOne({ _id: gameId });
            if (typeof getGame !== 'undefined') {
                var maxGamerscore = getGame.maxGamerscore;
            }
            if ( currentGamerscore === maxGamerscore ) gameCount += 1;
        });
        var totalGames = userGames.find({}).count();
        var gamesPercentage = Math.round(gameCount / totalGames * 100);
        return numberFormatter(gamesPercentage);
    },
    currentGamerscore: function () {
        var user = Meteor.user();
        return numberFormatter(user.profile.gamercard.gamerscore);
    },
    maxGamerscore: function () {
        var userId = Meteor.userId();
        var userGamesFind = userGames.find({ userId: userId });
        var maxGamerscore = 0;
        userGamesFind.forEach(function(userGame) {
            var gameId = userGame.gameId;
            var getGame = xbdGames.findOne({ _id: gameId });
            maxGamerscore += getGame.maxGamerscore;
        });
        return numberFormatter(maxGamerscore);
    },
    gamerscorePercentage: function () {
        var user = Meteor.user();
        var currentGamerscore = user.profile.gamercard.gamerscore;
        var userGamesFind = userGames.find({ userId: user._id });
        var maxGamerscore = 0;
        userGamesFind.forEach(function(userGame) {
            var gameId = userGame.gameId;
            var getGame = xbdGames.findOne({ _id: gameId });
            maxGamerscore += getGame.maxGamerscore;
        });
        var gamerscorePercentage = Math.round(currentGamerscore / maxGamerscore * 100);
        return numberFormatter(gamerscorePercentage);
    },
    gamesList: function () {
        var user = Meteor.user();
        return userGames.find({ userId: user._id, currentGamerscore: { $gt: 1 }}, { sort: { lastUnlock: -1 }, limit: 10 });
    },
    gamesListImage: function () {
        var xbdGame = xbdGames.findOne({ _id: this.gameId });
        var gameDetail = gameDetails.findOne({ gameId: this.gameId });
        var image = "/img/xboxdash_greenicon.png";
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
    },
    debugger: function () {
        console.log(this);
    }
});

Tracker.autorun(function() {
});