var gameLimit = new ReactiveVar();

Template.gameByGenre.created = function() {
	gameLimit.set(10);
	this.autorun(function() {
		var options = Router.current().params.query;
		options.limit = gameLimit.get();
		if (!Array.isArray(options.genres)) {
			options.genres = (options.genres) ? options.genres.split(',') : null;
		}
		Meteor.subscribe('gameByGenre', options);
	});
	$(window).scroll(function() {
		window.setTimeout(function() {
			showMoreVisible();
		}, 500);
	});
}

Template.gameByGenre.helpers({
	xbdGame: function () {
		return xbdGames.findOne({ _id: this.gameId }, {
			sort: { maxGamerscore: -1 }
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
			gameLimit.set(gameLimit.get() + 9);
		}
	} else {
		if (target.data("visible")) {
			target.data("visible", false);
		}
	}
}