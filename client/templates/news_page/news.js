var newsLimit = new ReactiveVar();

Template.newsPage.created = function() {
	DocHead.removeDocHeadAddedTags();

	var newsPageDescription = "Read the latest in Xbox & XBdash news.";
	var newsPageImage = "https://www.xbdash.com/img/share-default.jpg";
	var newsPageTitle = "News | XBdash - The Personalized Dashboard for Xbox® One and Xbox® 360 Gamers";
	var newsPageUrl = window.location.href;

	var newsPageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": "Read the latest in Xbox news." },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": newsPageDescription },
		{ "property": "og:image", "content": newsPageImage },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": newsPageTitle },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": newsPageUrl },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:url", "content": newsPageUrl },
		{ "name": "twitter:title", "content": newsPageTitle },
		{ "name": "twitter:description", "content": newsPageDescription },
		{ "name": "twitter:image:src", "content": newsPageImage },
		{ "name": "twitter:site", "content": "@xboxdash" }
	];

	var linkInfo = [
		{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": newsPageUrl },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
	];

	DocHead.setTitle(newsPageTitle);

	for(var i = 0; i < newsPageMeta.length; i++) {
		DocHead.addMeta(newsPageMeta[i]);;
	}

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}
}

Template.newsApp.helpers({
	userGamertag: function() {
		var user = Meteor.user();
		var userGamertag = user.username;
		if (user && user.gamercard && user.gamercard.gamertag) {
			userGamertag = user.gamercard.gamertag;
		}
		if (user && user.xboxProfile && user.xboxProfile.gamertag) {
			userGamertag = user.xboxProfile.gamertag;
		}
		return userGamertag;
	}
});

Template.featuredNewsSection.rendered = function() {
	$('.featured-news').slick({
		"arrows": true,
		"prevArrow": '<button type="button" class="slick-new-prev"><i class="fa fa-caret-left text-primary" aria-hidden="true"></i></button>',
		"nextArrow": '<button type="button" class="slick-new-next"><i class="fa fa-caret-right text-primary" aria-hidden="true"></i></button>',
		"draggable": true,
		"focusOnSelect": true,
		"edgeFriction": 0.20,
		"infinite": false,
		"mobileFirst": true,
		"rows": 1,
		"slidesPerRow": 4,
		"slidesToShow": 4,
		"swipeToSlide": true,
		"responsive": [
		{
			breakpoint: 1024,
			settings: {
				"slidesPerRow": 3,
				"slidesToShow": 3,
				infinite: true
			}
		},
		{
			breakpoint: 768,
			settings: {
				"slidesPerRow": 2,
				"slidesToShow": 1,
				infinite: true
			}
		}
		]
	});
}

Template.newsSection.created = function() {
	newsLimit.set(9);
	
	this.autorun(function() {
		Meteor.subscribe('latestNews', newsLimit.get());
	});
}

Template.newsSection.rendered = function() {
	$(window).scroll(function() {
		window.setTimeout(function() {
			showMoreVisible();
		}, 500);
	});
}

Template.newsSection.helpers({
	latestNews: function() {
		return xbdNews.find({}, {
			sort: {
				source: -1,
				updated: -1
			},
			limit: newsLimit.get()
		}).fetch();
	},
	hasMoreResults: function() {
		var newsLimitCurrent = newsLimit.get();
		var xbdNewsCount = xbdNews.find({}).count();
		if (xbdNewsCount < newsLimitCurrent) {
			return false;
		} else {
			return true;
		}
	}
});

function showMoreVisible() {
	var threshold, target = $("#hasMoreResults");
	if (!target.length) return;
	threshold = $(window).scrollTop() + $(window).height() - target.height();
	if (target.offset().top < threshold) {
		// if (!target.data("visible")) {
		target.data("visible", true);
		newsLimit.set(newsLimit.get() + 5);
		// }
	} else {
		// if (target.data("visible")) {
		target.data("visible", false);
		// }
	}
}