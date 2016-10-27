Template.gamesPage.created = function() {
	DocHead.removeDocHeadAddedTags();

	var gamesPageDescription = "Find award-winning video games, new franchises, and your favorite blockbusters.";
	var gamesPageImage = "https://www.xbdash.com/img/share-default.jpg";
	var gamesPageTitle = "Games | XBdash - The Personalized Dashboard for Xbox® One and Xbox® 360 Gamers";
	var gamesPageUrl = window.location.href;

	var gamesPageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": gamesPageDescription },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": gamesPageDescription },
		{ "property": "og:image", "content": gamesPageImage },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": gamesPageTitle },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": gamesPageUrl },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:url", "content": gamesPageUrl },
		{ "name": "twitter:title", "content": gamesPageTitle },
		{ "name": "twitter:description", "content": gamesPageDescription },
		{ "name": "twitter:image:src", "content": gamesPageImage },
		{ "name": "twitter:site", "content": "@xboxdash" }
	];

	var linkInfo = [
		{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": gamesPageUrl },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
	];

	DocHead.setTitle(gamesPageTitle);

	for(var i = 0; i < gamesPageMeta.length; i++) {
		DocHead.addMeta(gamesPageMeta[i]);;
	}

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
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

Template.gamesAppTwo.created = function() {
	this.subscribe('gamesByReleaseDate');
}

Template.gamesAppTwo.events({
    "mouseover .view-more-button": function() {
        $('.view-more-button .view-button').removeClass("inline");
        $('.view-more-button .view-button').addClass("none");
        $('.view-more-button .view-arrow').removeClass("none");
        $('.view-more-button .view-arrow').addClass("inline");
    },
    "mouseout .view-more-button": function() {
        $('.view-more-button .view-button').removeClass("none");
        $('.view-more-button .view-button').addClass("inline");
        $('.view-more-button .view-arrow').removeClass("inline");
        $('.view-more-button .view-arrow').addClass("none");
    },
    "click .recent-games": function() {
    	Router.go('gamesPage', {}, { query: {releaseDate: 'desc'} });
    }
});

Template.gamesAppTwo.helpers({
	xbdGame: function () {
		return xbdGames.findOne({ _id: this.gameId });
	},
	gamesByReleaseDate: function() {
		return gameDetails.find({}, {
			sort: { gameReleaseDate: -1 },
			limit: 18
		});
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