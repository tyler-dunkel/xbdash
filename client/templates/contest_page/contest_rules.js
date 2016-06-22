Template.contestRules.created = function() {
	DocHead.removeDocHeadAddedTags();

	var contestRulesPageDescription = "Review our contest rules.";
	var contestRulesPageImage = "https://www.xbdash.com/img/share-default.jpg";
	var contestRulesPageTitle = "Contest Rules | XBdash - The Personalized Dashboard for Xbox® One and Xbox® 360 Gamers";
	var contestRulesPageUrl = window.location.href;

	var contestRulesPageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": contestRulesPageDescription },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": contestRulesPageDescription },
		{ "property": "og:image", "content": contestRulesPageImage },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": contestRulesPageTitle },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": contestRulesPageUrl },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:url", "content": contestRulesPageUrl },
		{ "name": "twitter:title", "content": contestRulesPageTitle },
		{ "name": "twitter:description", "content": contestRulesPageDescription },
		{ "name": "twitter:image:src", "content": contestRulesPageImage },
		{ "name": "twitter:site", "content": "@xboxdash" }
	];

	var linkInfo = [
		{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": contestRulesPageUrl },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
	];

	DocHead.setTitle(contestRulesPageTitle);

	for(var i = 0; i < contestRulesPageMeta.length; i++) {
		DocHead.addMeta(contestRulesPageMeta[i]);;
	}

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}
}