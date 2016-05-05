var gameLimit = new ReactiveVar();

Template.myGamesApp.created = function() {
	gameLimit.set(25);
	this.autorun(function() {
		var limit = gameLimit.get();
		console.log('the limit is: ' + limit);
		Meteor.subscribe('myTopGames', {limit: limit});
	});
	$(window).scroll(function() {
		window.setTimeout(function() {
			showMoreVisible();
		}, 500);
	});
}

Template.myGamesApp.helpers({
	xbdGame: function () {
        return xbdGames.findOne({ _id: this.gameId }, {
            sort: { maxGamerscore: -1 }
        });
    },
    gamesByGamerscore: function() {
		var userId = Meteor.userId();
		var games = userGames.find({ userId: userId }, {
            sort: { currentGamerscore: -1 }
        });
        var gameDetailArray = [];

        games.forEach(function(game) {
            var sortedGameDetail = gameDetails.findOne({ gameId: game.gameId });
            gameDetailArray.push(sortedGameDetail);
        });

        return gameDetailArray;
	},
	'hasMoreResults': function() {
		var gameLimitCurrent = gameLimit.get();
		var gameDetailsCount = gameDetails.find({}).count();
		return ! (gameDetailsCount < gameLimitCurrent);
	}
});

function showMoreVisible() {
	var threshold, target = $("#hasMoreResults");
	if (!target.length) return;
	threshold = $(window).scrollTop() + $(window).height() - target.height();
	if (target.offset().top < threshold) {
		console.log(target.data);
		if (!target.data("visible")) {
			target.data("visible", true);
			gameLimit.set(gameLimit.get() + 9);
		}
	} else {
		if (target.data("visible")) {
			target.data("visible", false);
		}
	}
}