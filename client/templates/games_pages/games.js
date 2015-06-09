Template.gamesApp.onCreated(function() {
	var limit = 20;
	this.subscribe('topGamerscoreGames');
	this.subscribe('gamesByReleaseDate');
});

Template.gamesPage.events({
});

Template.gamesApp.helpers({
	topGamerscoreGames: function() {
		var games = xbdGames.find({}, {sort: {maxGamerscore: -1}, limit: 18}).fetch();
		//console.log(games);
		return games;
	},
	gamesByReleaseDate: function() {
		var games = gameDetails.find({}, {sort: {gameReleaseDate: -1}, limit: 18}).fetch();
		console.log(games);
		return games;
	},
	dateFormat: function() {
		return moment(this.gameReleaseDate).format('l');
	},
	rateFormat: function() {
		return $('#game-rating').raty({ readOnly: true, score: this.gameAllTimeAverageRating });
	}
});

Tracker.autorun(function() {
});