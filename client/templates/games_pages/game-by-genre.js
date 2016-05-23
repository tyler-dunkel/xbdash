var gameLimit = new ReactiveVar();

Template.gameByGenre.created = function() {
	gameLimit.set(18);
	console.log('created game by genre temp');
	this.autorun(function() {
		var options = Router.current().params.query;
		options.limit = gameLimit.get();
		if (!Array.isArray(options.genres)) {
			options.genres = (options.genres) ? options.genres.split(',') : null;
		}
		console.log(options);
		Meteor.subscribe('gameByGenre', options);
	});
	$(window).scroll(function() {
		window.setTimeout(function() {
			showMoreVisible();
		}, 500);
	});
}

//ugly hack to force reset of gamelimit when a filtering option is selected
//would like to remove if implementation fix can be found.
Meteor.autorun(function(c) {
	if (!c.firstRun) {
		Session.set('forceReset', 1);
		gameLimit.set(18);
	}
	Session.get('forceReset');
});

Template.gameByGenre.helpers({
	xbdGame: function () {
		return xbdGames.findOne({ _id: this.gameId }, {
			sort: { maxGamerscore: -1 }
		});
	},
	gamesByReleaseDate: function() {
		var sortParams = Router.current().params.query;
		var releaseDate = -1;
		var name = 0;
		var sortSelector;
		if (sortParams && sortParams.releaseDate && sortParams.releaseDate === 'asc') {
			releaseDate = 1;
		}
		if (sortParams && sortParams.name) {
			console.log('there is a name param');
			if (sortParams.name === 'asc') {
				name = -1;
			} else {
				name = 1;
			}
		}
		if (name === 0) {
			sortSelector = {gameReleaseDate: releaseDate};
		} else {
			sortSelector = {gameName: name, gameReleaseDate: releaseDate};
		}
		console.log(sortSelector);
		return gameDetails.find({}, {
			sort: sortSelector,
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