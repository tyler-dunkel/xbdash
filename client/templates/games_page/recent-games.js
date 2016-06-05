var gameLimit = new ReactiveVar();

Template.recentGamesPage.created = function() {
	DocHead.removeDocHeadAddedTags();

	var linkInfo = [
		{ "rel": "icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": window.location.href }
	];

	var recentGamesPageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": "See the latest award-winning video games, all new franchises, and your favorite blockbusters." },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": "See the latest award-winning video games, all new franchises, and your favorite blockbusters." },
		{ "property": "og:image", "content": "https://www.xbdash.com/img/contests/contest-banner.jpg" },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": "Recently Released Games | XBdash - The Personalized Dashboard for Xbox® Gamers" },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": window.location.href },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:description", "content": "See the latest award-winning video games, all new franchises, and your favorite blockbusters." },
		{ "name": "twitter:title", "content": "Recently Released Games | XBdash - The Personalized Dashboard for Xbox® Gamers" },
		{ "name": "twitter:image", "content": "https://www.xbdash.com/img/contests/contest-banner.jpg" }
	];

	DocHead.setTitle("Recently Released Games | XBdash - The Personalized Dashboard for Xbox® Gamers");

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}

	for(var i = 0; i < recentGamesPageMeta.length; i++) {
		DocHead.addMeta(recentGamesPageMeta[i]);;
	}
}

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
			limit: gameLimit.get()
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