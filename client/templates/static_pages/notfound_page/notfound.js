Template.notFound.created = function() {
	DocHead.removeDocHeadAddedTags();

	var linkInfo = [
		{ rel: "icon", type: "image/x-icon", href: "https://www.xbdash.com/img/favicon.ico" },
		{ rel: "canonical", href: window.location.href }
	];

	var notFoundMeta = [
		{ name: "description", content: "Manage achievements. Complete games. See results. XBdash is a personalized dashboard for Xbox® Gamers. Manage achievements. Complete games. See results." },
		{ property: "fb:app_id", content: Meteor.settings.public.facebookAppId },
		{ property: "og:description", content: "Manage achievements. Complete games. See results. XBdash is a personalized dashboard for Xbox® Gamers. Manage achievements. Complete games. See results." },
		{ property: "og:image", content: "https://www.xbdash.com/img/share-default.jpg" },
		{ property: "og:locale", content: "en_US" },
		{ property: "og:site_name", content: "XBdash" },
		{ property: "og:title", content: "404 - Page Not Found - XBdash" },
		{ property: "og:type", content: "website" },
		{ property: "og:url", content: window.location.href },
	];

	DocHead.setTitle('404 - Page Not Found - XBdash');
	
	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}

	for(var i = 0; i < notFoundMeta.length; i++) {
		DocHead.addMeta(notFoundMeta[i]);;
	}
}