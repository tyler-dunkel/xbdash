Template.gamesApp.rendered = function() {
}

Template.gamesApp.created = function() {
	var limit = 20;
	this.subscribe('myTopGames');
	this.subscribe('gamesByReleaseDate');
}

Template.gamesApp.helpers({
    xbdGame: function () {
        return xbdGames.findOne({ _id: this.gameId }, {
            sort: { maxGamerscore: -1 },
            fields: {
                platform: 1,
                name: 1,
                maxGamerscore: 1,
                slug: 1
            },
            limit: 10
        });
    },
	myTopGames: function() {
		var games = userGames.find({}, {
            sort: { currentGamerscore: -1 },
            fields: {
                gameId: 1,
                userId: 1,
                currentGamerscore: 1
            },
            limit: 10
        });
        var gameDetailArray = [];

        games.forEach(function(game) {
            var sortedGameDetail = gameDetails.findOne({ gameId: game.gameId }, {
                fields: {
                    gameId: 1,
                    gameName: 1,
                    gameReleaseDate: 1,
                    gameGenre: 1,
                    gameArt: 1,
                    gamePublisherName: 1,
                    gameAllTimeAverageRating: 1
                }
            });

            gameDetailArray.push(sortedGameDetail);
        });

        return gameDetailArray;
	},
	gamesByReleaseDate: function() {
		return gameDetails.find({}, {
            fields: {
                gameId: 1,
                gameName: 1,
                gameReleaseDate: 1,
                gameGenre: 1,
                gameArt: 1,
                gamePublisherName: 1,
                gameAllTimeAverageRating: 1
            },
            sort: { gameReleaseDate: -1 },
            limit: 10
        });
	}
});

Template.gamesPage.events({
});

Tracker.autorun(function() {
});