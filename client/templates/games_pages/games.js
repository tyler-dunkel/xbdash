Template.gamesApp.rendered = function() {
    $('.game-rating').raty({
        readOnly: true,
        numberMax : 5,
        score: function() {
            return $(this).attr('data-score');
        },
        starOff: 'star-off.png',
        starOn: 'star-on.png'
    });
}

Template.gamesApp.onCreated(function() {
	var limit = 20;
	this.subscribe('myTopGames');
	this.subscribe('gamesByReleaseDate');
});

Template.gamesPage.events({
});

Template.gamesApp.helpers({
	myTopGames: function() {
		var games = userGames.find({}, { sort: { currentGamerscore: -1 }, limit: 12 });
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
		return gameDetails.find({}, { sort: { gameReleaseDate: -1 }, limit: 12 }).fetch();
	},
});

Tracker.autorun(function() {
});