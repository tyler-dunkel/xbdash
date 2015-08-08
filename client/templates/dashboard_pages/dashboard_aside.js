Template.dashboardAside.rendered = function() {
}

Template.dashboardAside.helpers({
	achievementsCompleted: function () {
		var achievementsCount = 0;
        var achievementsCount = userAchievements.find({ progressState: true }).count();
        return numberFormatter(achievementsCount);
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
    currentGamerscore: function () {
        var user = Meteor.user();
        return numberFormatter(user.profile.gamercard.gamerscore);
    },
    totalAchievements: function () {
        var totalAchievements = userAchievements.find({}).count();
        return numberFormatter(totalAchievements);
    },
    totalGames: function () {
        var totalGames = userGames.find({}).count();
        return numberFormatter(totalGames);
    }
});