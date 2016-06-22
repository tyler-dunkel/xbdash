Template.achievementsPage.created = function() {
	DocHead.removeDocHeadAddedTags();

	var achievementsPageDescription = "Find the most difficult achievements and collaborate with other gamers for achievement solutions.";
	var achievementsPageImage = "https://www.xbdash.com/img/share-default.jpg";
	var achievementsPageTitle = "Achievements | XBdash - The Personalized Dashboard for Xbox® One and Xbox® 360 Gamers";
	var achievementsPageUrl = window.location.href;

	var achievementsPageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": achievementsPageDescription },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": achievementsPageDescription },
		{ "property": "og:image", "content": achievementsPageImage },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": achievementsPageTitle },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": achievementsPageUrl },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:url", "content": achievementsPageUrl },
		{ "name": "twitter:title", "content": achievementsPageTitle },
		{ "name": "twitter:description", "content": achievementsPageDescription },
		{ "name": "twitter:image:src", "content": achievementsPageImage },
		{ "name": "twitter:site", "content": "@xboxdash" }
	];

	var linkInfo = [
		{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": achievementsPageUrl },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
	];

	DocHead.setTitle(achievementsPageTitle);

	for(var i = 0; i < achievementsPageMeta.length; i++) {
		DocHead.addMeta(achievementsPageMeta[i]);;
	}

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}
}

Template.achievementsApp.created = function() {
	var limit = 20;
	this.subscribe('mostPopularAchievements');
	this.subscribe('rarestAchievements');
}

Template.achievementsApp.rendered = function() {
	$('[data-toggle="tooltip"]').tooltip();
}

Template.achievementsApp.events({
	"click .common-button": function(e) {
		e.preventDefault();
		Router.go('achievementsPage', {}, { query: 'tier=common' });
	},
	"click .rare-button": function(e) {
		e.preventDefault();
		Router.go('achievementsPage', {}, { query: 'tier=rare' });
	},
	"click .epic-button": function(e) {
		e.preventDefault();
		Router.go('achievementsPage', {}, { query: 'tier=epic' });
	},
	"click .legendary-button": function(e) {
		e.preventDefault();
		Router.go('achievementsPage', {}, { query: 'tier=legendary' });
	}
});

Template.achievementsApp.helpers({
	mostPopularAchievements: function() {
		var achievements = xbdAchievements.find({}, { sort: { userPercentage: -1 }, limit: 10 });
		return achievements;
	},
	rarestAchievements: function() {
		var achievements = xbdAchievements.find({}, { sort: { userPercentage: 1 }, limit: 10 });
		return achievements;
	}
});

Template.achievementsPage.helpers({
	showMore: function() {
		var options = Router.current().params.query;
		console.log(options);
		if (_.isEmpty(options)) {
			return false;
		}
		return true;
	}
});