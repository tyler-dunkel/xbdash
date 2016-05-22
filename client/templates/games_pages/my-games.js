var gameLimit = new ReactiveVar();

Template.myGamesApp.created = function() {
	gameLimit.set(12);
	this.autorun(function() {
		var options = Router.current().params.query;
		options.limit = gameLimit.get();
		Meteor.subscribe('myTopGames', options);
	});
	$(window).scroll(function() {
		window.setTimeout(function() {
			showMoreVisible();
		}, 500);
	});
}

//ugly hack to force reset of gamelimit when a filtering option is selected
//would like to remove if implementation fix can be found.
Meteor.autorun(function() {
	Session.set('forceReset', 1);
	Session.get('forceReset');
	gameLimit.set(12);
});

Template.myGamesApp.helpers({
	xbdGame: function () {
		return xbdGames.findOne({ _id: this.gameId }, {
			sort: { maxGamerscore: -1 }
		});
	},
	gamesByGamerscore: function() {
		var sortParams = Router.current().params.query;
		var userId = Meteor.userId();
		var sortSelector = {};
		var selector = {userId: userId};
		console.log(sortParams);
		console.log(_.isEmpty(sortParams));
		if (!_.isEmpty(sortParams)) {
			console.log('in the if block');
			if (sortParams.earnedgamerscore) {
				sortSelector.currentGamerscore = (sortParams.earnedgamerscore === 'asc') ? 1 : -1;
			}
			if (sortParams.earnedachievements) {
				sortSelector.earnedAchievements = (sortParams.earnedachievements === 'asc') ? 1 : -1;
			}
			if (sortParams.completed && sortParams.completed !== 'all') {
				selector.completed = (sortParams.completed === 'true') ? true : false;
			}
		} else {
			sortSelector.currentGamerscore = -1;
		}
		console.log(sortSelector);
		console.log(selector);
		var games = userGames.find({ userId: userId }, {
			sort: sortSelector
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
			gameLimit.set(gameLimit.get() + 12);
		}
	} else {
		if (target.data("visible")) {
			target.data("visible", false);
		}
	}
}