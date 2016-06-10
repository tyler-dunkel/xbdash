Template.notFound.created = function() {
	DocHead.removeDocHeadAddedTags();

	var notFoundPageDescription = "Manage achievements. Complete games. See results. XBdash is a personalized dashboard for Xbox® Gamers. Manage achievements. Complete games. See results.";
	var notFoundPageImage = "https://www.xbdash.com/img/share-default.jpg";
	var notFoundPageTitle = notFoundPageTitle;
	var notFoundPageUrl = window.location.href;

	var notFoundPageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": notFoundPageDescription },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": notFoundPageDescription },
		{ "property": "og:image", "content": notFoundPageImage },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": notFoundPageTitle },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": notFoundPageUrl },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:url", "content": notFoundPageUrl },
		{ "name": "twitter:title", "content": notFoundPageTitle },
		{ "name": "twitter:description", "content": notFoundPageDescription },
		{ "name": "twitter:image:src", "content": notFoundPageImage },
		{ "name": "twitter:site", "content": "@xboxdash" }
	];

	var linkInfo = [
		{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": notFoundPageUrl },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
	];

	DocHead.setTitle(notFoundPageTitle);

	for(var i = 0; i < notFoundPageMeta.length; i++) {
		DocHead.addMeta(notFoundPageMeta[i]);;
	}

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}
}