var gameLimit = new ReactiveVar();

Template.myGamesPage.created = function() {
	DocHead.removeDocHeadAddedTags();

	var myGamesPageDescription = "Review help and frequently asked questions.";
	var myGamesPageImage = "https://www.xbdash.com/img/share-default.jpg";
	var myGamesPageTitle = "My Games | XBdash - The Personalized Dashboard for Xbox® One and Xbox® 360 Gamers";
	var myGamesPageUrl = window.location.href;

	var myGamesPageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": myGamesPageDescription },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": myGamesPageDescription },
		{ "property": "og:image", "content": myGamesPageImage },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": myGamesPageTitle },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": myGamesPageUrl },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:url", "content": myGamesPageUrl },
		{ "name": "twitter:title", "content": myGamesPageTitle },
		{ "name": "twitter:description", "content": myGamesPageDescription },
		{ "name": "twitter:image:src", "content": myGamesPageImage },
		{ "name": "twitter:site", "content": "@xboxdash" }
	];

	var linkInfo = [
		{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": myGamesPageUrl },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
	];

	DocHead.setTitle(myGamesPageTitle);

	for(var i = 0; i < myGamesPageMeta.length; i++) {
		DocHead.addMeta(myGamesPageMeta[i]);;
	}

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}
}

Template.myGamesApp.created = function() {
	gameLimit.set(18);
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
Meteor.autorun(function(c) {
	if (!c.firstRun) {
		Session.set('forceReset', 1);
		gameLimit.set(18);
	}
	Session.get('forceReset');
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