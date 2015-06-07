Template.gamesApp.onCreated(function() {
	var limit = 20;
	this.subscribe('topGamerscoreGames');
	this.subscribe('gamesByReleaseDate');
});

Template.gamesPage.events({
});

Template.gamesApp.helpers({
	topGamerscoreGames: function() {
		var games = xbdGames.find({}, {sort: {maxGamerscore: -1}, limit: 20}).fetch();
		//console.log(games);
	},
	gamesByReleaseDate: function() {
		var games = gameDetails.find({}, {sort: {gameReleaseDate: -1}, limit: 20}).fetch();
		console.log(games);
	}
});

Tracker.autorun(function() {
});