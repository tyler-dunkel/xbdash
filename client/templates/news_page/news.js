var newsLimit = new ReactiveVar();

Template.newsPage.created = function() {
	DocHead.removeDocHeadAddedTags();

	var linkInfo = [
		{ "rel": "icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": window.location.href }
	];

	var newsPageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": "Read the latest in Xbox news." },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": "Read the latest in Xbox news." },
		{ "property": "og:image", "content": "https://www.xbdash.com/img/contests/contest-banner.jpg" },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": "News | XBdash - The Personalized Dashboard for Xbox® Gamers" },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": window.location.href },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:description", "content": "Read the latest in Xbox news." },
		{ "name": "twitter:title", "content": "News | XBdash - The Personalized Dashboard for Xbox® Gamers" },
		{ "name": "twitter:image", "content": "https://www.xbdash.com/img/contests/contest-banner.jpg" }
	];

	DocHead.setTitle("News | XBdash - The Personalized Dashboard for Xbox® Gamers");

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}

	for(var i = 0; i < newsPageMeta.length; i++) {
		DocHead.addMeta(newsPageMeta[i]);;
	}
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
		return ! (xbdNewsCount < newsLimitCurrent);
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