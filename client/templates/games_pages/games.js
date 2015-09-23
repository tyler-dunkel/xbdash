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
            limit: 10
        });
    },
	myTopGames: function() {
        var userId = Meteor.userId();
		var games = userGames.find({ userId: userId }, {
            sort: { currentGamerscore: -1 },
            limit: 10
        });
        var gameDetailArray = [];

        games.forEach(function(game) {
            var sortedGameDetail = gameDetails.findOne({ gameId: game.gameId });
            gameDetailArray.push(sortedGameDetail);
        });

        return gameDetailArray;
	},
	gamesByReleaseDate: function() {
		return gameDetails.find({}, {
            sort: { gameReleaseDate: -1 },
            limit: 10
        });
	}
});

Template.gamesPage.events({
});

Tracker.autorun(function() {
});