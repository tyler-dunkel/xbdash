Template.dashboard.created = function() {
	DocHead.removeDocHeadAddedTags();

	var dashboardPageDescription = "Review your achievements per day, gamerscore per day, and your game genre distribution.";
	var dashboardPageImage = "https://www.xbdash.com/img/share-default.jpg";
	var dashboardPageTitle = "Your Dashboard | XBdash - The Personalized Dashboard for Xbox® Gamers";
	var dashboardPageUrl = window.location.href;

	var dashboardPageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": dashboardPageDescription },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": dashboardPageDescription },
		{ "property": "og:image", "content": dashboardPageImage },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": dashboardPageTitle },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": dashboardPageUrl },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:url", "content": dashboardPageUrl },
		{ "name": "twitter:title", "content": dashboardPageTitle },
		{ "name": "twitter:description", "content": dashboardPageDescription },
		{ "name": "twitter:image:src", "content": dashboardPageImage },
		{ "name": "twitter:site", "content": "@xboxdash" }
	];

	var linkInfo = [
		{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": dashboardPageUrl },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
	];

	DocHead.setTitle(dashboardPageTitle);

	for(var i = 0; i < dashboardPageMeta.length; i++) {
		DocHead.addMeta(dashboardPageMeta[i]);;
	}

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}
};

Template.dashboard.rendered = function() {
	$(function () {
		$('[data-toggle="tooltip"]').tooltip()
	});
};

Template.dashboard.helpers({
	chkBuilding: function() {
		var user = Meteor.user();
		if (user.gamertagScanned.status === 'building') return true;
	}
});