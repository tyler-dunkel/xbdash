Template.gamesApp.onCreated(function() {
	var limit = 20;
	this.subscribe('topGamerscoreGames');
	this.subscribe('gamesByReleaseDate');
});

Template.gamesPage.events({
});

Template.gamesApp.helpers({
	topGamerscoreGames: function() {
		var games = userGames.find({}, {sort: {earnedAchievements: -1}, limit: 12});
		console.log(games);
		return games;
	},
	gamesByReleaseDate: function() {
		return gameDetails.find({}, {sort: {gameReleaseDate: -1}, limit: 12});
	},
	dateFormat: function() {
		return moment(this.gameReleaseDate).format('l');
	},
	rateFormat: function() {
		return $('#game-rating').raty({ readOnly: true, score: this.gameAllTimeAverageRating });
	},
    gamesImage: function () {
        var xbdGame = xbdGames.findOne({ _id: this.gameId });
        var gameDetail = gameDetails.findOne({ gameId: this.gameId });
        var image = "/img/xboxdash_greenicon.png";
        if (xbdGame.platform === 'Xenon') {
            gameDetail.gameArt.forEach(function(art) {
                if (art.Purpose === 'BoxArt' && art.Width === 219) {
                    image =  art.Url;
                }
            });
        }
        if (xbdGame.platform === 'Durango') {
            gameDetail.gameArt.forEach(function(art) {
                if (art.Purpose === 'BrandedKeyArt' && art.Width === 584) {
                    image =  art.Url;
                }
            });
        }
        return image;
    },
});

Tracker.autorun(function() {
});