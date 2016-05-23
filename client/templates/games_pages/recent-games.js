var gameLimit = new ReactiveVar();

Template.recentGamesApp.created = function() {
	gameLimit.set(18);
	this.autorun(function() {
		var limit = gameLimit.get();
		console.log('limit is: ' + limit);
		Meteor.subscribe('gamesByReleaseDate', {limit: limit});
	});
	$(window).scroll(function() {
		window.setTimeout(function() {
			showMoreVisible();
		}, 500);
	});
}

Template.recentGamesApp.helpers({
	xbdGame: function () {
		return xbdGames.findOne({ _id: this.gameId }, {
			sort: { maxGamerscore: -1 },
			limit: 18
		});
	},
	gamesByReleaseDate: function() {
		return gameDetails.find({}, {
			sort: { gameReleaseDate: -1 },
			limit: gameLimit.get()
		});
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
			gameLimit.set(gameLimit.get() + 12);
		}
	} else {
		if (target.data("visible")) {
			target.data("visible", false);
		}
	}
}