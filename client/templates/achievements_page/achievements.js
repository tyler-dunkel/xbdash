Template.achievementsPage.created = function() {
	DocHead.removeDocHeadAddedTags();

	var linkInfo = [
		{ "rel": "icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": window.location.href }
	];

	var achievementsPageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": "Find the most difficult achievements and collaborate with other gamers for achievement solutions." },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": "Find the most difficult achievements and collaborate with other gamers for achievement solutions." },
		{ "property": "og:image", "content": "https://www.xbdash.com/img/contests/contest-banner.jpg" },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": "Achievements | XBdash - The Personalized Dashboard for Xbox® Gamers" },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": window.location.href },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:description", "content": "Find the most difficult achievements and collaborate with other gamers for achievement solutions." },
		{ "name": "twitter:title", "content": "Achievements | XBdash - The Personalized Dashboard for Xbox® Gamers" },
		{ "name": "twitter:image", "content": "https://www.xbdash.com/img/contests/contest-banner.jpg" }
	];

	DocHead.setTitle("Achievements | XBdash - The Personalized Dashboard for Xbox® Gamers");

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}

	for(var i = 0; i < achievementsPageMeta.length; i++) {
		DocHead.addMeta(achievementsPageMeta[i]);;
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