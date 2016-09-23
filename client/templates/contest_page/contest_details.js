Template.contestDetailsPage.created = function() {
	DocHead.removeDocHeadAddedTags();

	var contestPageDescription = "Participate in this month's contest. Win games, accessories, and more!";
	var contestPageImage = "https://www.xbdash.com/img/share-default.jpg";
	var contestPageTitle = "Contests | XBdash - The Personalized Dashboard for Xbox® One and Xbox® 360 Gamers";
	var contestPageUrl = window.location.href;

	var contestPageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": contestPageDescription },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": contestPageDescription },
		{ "property": "og:image", "content": contestPageImage },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": contestPageTitle },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": contestPageUrl },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:url", "content": contestPageUrl },
		{ "name": "twitter:title", "content": contestPageTitle },
		{ "name": "twitter:description", "content": contestPageDescription },
		{ "name": "twitter:image:src", "content": contestPageImage },
		{ "name": "twitter:site", "content": "@xboxdash" }
	];

	var linkInfo = [
		{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": contestPageUrl },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
	];

	DocHead.setTitle(contestPageTitle);

	for(var i = 0; i < contestPageMeta.length; i++) {
		DocHead.addMeta(contestPageMeta[i]);;
	}

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}

	this.autorun(function() {
		Meteor.subscribe('contestDetailsPub', Router.current().params.contestToken);
	});
}

Template.contestDetailsPage.helpers({
	contestTypeHelper: function() {
		var contestToken = Router.current().params.contestToken;
		var xbContest = xbdContests.findOne({ 'status': 'active', 'contestToken': contestToken });
		
		if (xbContest && xbContest.type === 'referral') {
			return 'referralContestTemplate';
		}
		if (xbContest && xbContest.type === 'completeAchievements') {
			return 'achievementCompletionContestTemplate';
		}
		if (xbContest && xbContest.type === 'completeGame') {
			return 'gameCompletionContestTemplate';
		}
		if (xbContest && xbContest.type === 'timeAttack') {
			return 'timeAttackContestTemplate';
		}
	}
});