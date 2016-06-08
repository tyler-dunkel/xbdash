Template.usersPage.created = function() {
	DocHead.removeDocHeadAddedTags();
	
	var user = Meteor.user();
	var usersPageDescription = name + " | Gamerscore: " + user.gamercard.gamerscore + " | " + user.gamercard.motto;
	var usersPageImage = "https://res.cloudinary.com/xbdash/image/fetch/w_1200,h_628,c_pad,b_rgb:000000/" + user.gamercard.gamerpicLargeSslImagePath;
	var usersPageTitle = user.gamercard.gamertag + " | XBdash - The Personalized Dashboard for Xbox® Gamers";
	var usersPageUrl = window.location.href;

	var usersPageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": usersPageDescription },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": usersPageDescription },
		{ "property": "og:image", "content": usersPageImage },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": usersPageTitle },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": usersPageUrl },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:url", "content": usersPageUrl },
		{ "name": "twitter:title", "content": usersPageTitle },
		{ "name": "twitter:description", "content": usersPageDescription },
		{ "name": "twitter:image:src", "content": usersPageImage },
		{ "name": "twitter:site", "content": "@xboxdash" }
	];

	var linkInfo = [
		{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": usersPageUrl },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
	];

	DocHead.setTitle(usersPageTitle);

	for(var i = 0; i < usersPageMeta.length; i++) {
		DocHead.addMeta(usersPageMeta[i]);;
	}

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}
}