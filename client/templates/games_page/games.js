Template.gamesPage.created = function() {
	DocHead.removeDocHeadAddedTags();

	var linkInfo = [
		{ "rel": "icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": window.location.href }
	];

	var gamesPageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": "Find award-winning video games, new franchises, and your favorite blockbusters." },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": "Find award-winning video games, new franchises, and your favorite blockbusters." },
		{ "property": "og:image", "content": "https://www.xbdash.com/img/contests/contest-banner.jpg" },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": "Games | XBdash - The Personalized Dashboard for Xbox® Gamers" },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": window.location.href },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:description", "content": "Find award-winning video games, new franchises, and your favorite blockbusters." },
		{ "name": "twitter:title", "content": "Games | XBdash - The Personalized Dashboard for Xbox® Gamers" },
		{ "name": "twitter:image", "content": "https://www.xbdash.com/img/contests/contest-banner.jpg" }
	];

	DocHead.setTitle("Games | XBdash - The Personalized Dashboard for Xbox® Gamers");

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}

	for(var i = 0; i < gamesPageMeta.length; i++) {
		DocHead.addMeta(gamesPageMeta[i]);;
	}
}

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
    },
    "click .recent-games": function() {
    	Router.go('gamesPage', {}, { query: {releaseDate: 'desc'} });
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