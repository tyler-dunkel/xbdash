Template.gamesApp.rendered = function() {
}

Template.gamesApp.onCreated(function() {
	var limit = 20;
	this.subscribe('myTopGames');
	this.subscribe('gamesByReleaseDate');
});

Template.gamesApp.helpers({
    xbdGame: function () {
        return xbdGames.findOne({ _id: this.gameId });
    },
	myTopGames: function() {
		var games = userGames.find({}, { sort: { currentGamerscore: -1 }, limit: 10 });
        //console.log(games);
        var gameDetailArray = [];
        games.forEach(function(game) {
            //console.log("this game id: " + game.gameId);
            var sortedGameDetail = gameDetails.findOne({ gameId: game.gameId });
            //console.log("gave this game " + sortedGameDetail.gameName);
            gameDetailArray.push(sortedGameDetail);
        });
        return gameDetailArray;
	},
	gamesByReleaseDate: function() {
		return gameDetails.find({}, { sort: { gameReleaseDate: -1 }, limit: 10 }).fetch();
	},
});

Template.gamesPage.events({
});

Tracker.autorun(function() {
});