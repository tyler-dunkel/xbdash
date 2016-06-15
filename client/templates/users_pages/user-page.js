Template.userProfilePage.created = function() {
	DocHead.removeDocHeadAddedTags();

	var gamertagSlug = Router.current().params.gamertagSlug;
	this.subscribe('userProfile', gamertagSlug);
	
	var user = Meteor.user();
	var userProfilePageDescription = name + " | Gamerscore: " + user.gamercard.gamerscore + " | " + user.gamercard.motto;
	var userProfilePageImage = "https://res.cloudinary.com/xbdash/image/fetch/w_1200,h_628,c_pad,b_rgb:000000/" + user.gamercard.gamerpicLargeSslImagePath;
	var userProfilePageTitle = user.gamercard.gamertag + " | XBdash - The Personalized Dashboard for Xbox® Gamers";
	var userProfilePageUrl = window.location.href;

	var userProfilePageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": userProfilePageDescription },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": userProfilePageDescription },
		{ "property": "og:image", "content": userProfilePageImage },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": userProfilePageTitle },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": userProfilePageUrl },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:url", "content": userProfilePageUrl },
		{ "name": "twitter:title", "content": userProfilePageTitle },
		{ "name": "twitter:description", "content": userProfilePageDescription },
		{ "name": "twitter:image:src", "content": userProfilePageImage },
		{ "name": "twitter:site", "content": "@xboxdash" }
	];

	var linkInfo = [
		{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": userProfilePageUrl },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
	];

	DocHead.setTitle(userProfilePageTitle);

	for(var i = 0; i < userProfilePageMeta.length; i++) {
		DocHead.addMeta(userProfilePageMeta[i]);;
	}

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}
}

Template.userProfilePage.helpers({
	user: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		return Meteor.users.find({ gamertagSlug: gamertagSlug });
	}
});

Template.userProfileArea.helpers({
	userGamerPic: function () {
		var user = Meteor.users.findOne({ userId: this.userId });
		return "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_96,h_96/" + encodeURIComponent(user.xboxProfile.gameDisplayPicRaw);
	},
	userGamercard: function () {
		var user = Meteor.users.findOne({ userId: this.userId });
		return user.gamercard.gamertag;
	},
	userMotto: function () {
		var user = Meteor.users.findOne({ userId: this.userId });
		return user.gamercard.motto;	
	}
});