Template.gamesPage.helpers({
	genreSearch: function() {
		var options = Router.current().params.query;
		if (_.isEmpty(options)) {
			return false;
		}
		return true;
	}
});

Template.gamesApp.created = function() {
	this.subscribe('myTopGames');
	this.subscribe('gamesByReleaseDate');
}

Template.gamesApp.events({
	"mouseover .completed-games-title": function() {
		$('.completed-games-title .view-button').removeClass("inline");
		$('.completed-games-title .view-button').addClass("none");
		$('.completed-games-title .view-arrow').removeClass("none");
		$('.completed-games-title .view-arrow').addClass("inline");
	},
	"mouseout .completed-games-title": function() {
		$('.completed-games-title .view-button').removeClass("none");
		$('.completed-games-title .view-button').addClass("inline");
		$('.completed-games-title .view-arrow').removeClass("inline");
		$('.completed-games-title .view-arrow').addClass("none");
	},
    "mouseover .recent-games-title": function() {
        $('.recent-games-title .view-button').removeClass("inline");
        $('.recent-games-title .view-button').addClass("none");
        $('.recent-games-title .view-arrow').removeClass("none");
        $('.recent-games-title .view-arrow').addClass("inline");
    },
    "mouseout .recent-games-title": function() {
        $('.recent-games-title .view-button').removeClass("none");
        $('.recent-games-title .view-button').addClass("inline");
        $('.recent-games-title .view-arrow').removeClass("inline");
        $('.recent-games-title .view-arrow').addClass("none");
    }
});

Template.gamesApp.helpers({
	xbdGame: function () {
		return xbdGames.findOne({ _id: this.gameId });
	},
	myTopGames: function() {
		var userId = Meteor.userId();
		var games = userGames.find({ userId: userId }, {
			sort: { currentGamerscore: -1 },
			limit: 6
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
			limit: 6
		});
	}
});