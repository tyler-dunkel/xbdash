Template.userProfilePage.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	this.subscribe('userProfile', gamertagSlug);
	
	// var user = Meteor.users.find({ gamertagSlug: gamertagSlug });
}

Template.userProfilePage.helpers({
	user: function () {
		DocHead.removeDocHeadAddedTags();

		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.find({ gamertagSlug: gamertagSlug });

		if (user && user.gamercard) {
			var userProfilePageDescription = user.gamercard.gamertag + " | Gamerscore: " + user.gamercard.gamerscore + " | " + user.gamercard.motto;
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

		return user;
	}
});

Template.userProfileArea.helpers({
	userGamerPic: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		if (user && user.xboxProfile) {
			return "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_96,h_96/" + encodeURIComponent(user.xboxProfile.gameDisplayPicRaw);
		}
		return "/img/xbdash_greenicon.png";
	},
	userGamertag: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		if (user && user.gamercard) {
			return user.gamercard.gamertag;
		}
	},
	userMotto: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		if (user && user.gamercard) {
			return user.gamercard.motto;
		}
	}
});

Template.userActivity.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	this.subscribe('userActivity', gamertagSlug);
}

Template.userClips.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	this.subscribe('userClips', gamertagSlug);
}

Template.userCaptures.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	this.subscribe('userCaptures', gamertagSlug);
}

Template.userBadges.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	this.subscribe('userBadges', gamertagSlug);
}

Template.userWishlist.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	this.subscribe('userWishlist', gamertagSlug);
}

Template.userTrophyCase.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	this.subscribe('userTrophyCase', gamertagSlug);
}

Template.xbdAnnouncements.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	this.subscribe('xbdAnnouncements', gamertagSlug);
}

Template.xbdTweets.helpers({
	getTwitterScreenName: function () {
		var user = Meteor.users.find({ _id: this._id });
		if (user && user.services) {
			return user.services.twitter.screenName;
		}
	},
	getTweets: function () {
		// var gamertagSlug = Router.current().params.gamertagSlug;
		// var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		// if (user && user.services) {
		// 	console.log(user.services);
		// 	var twitterScreenName = user.services.twitter.screenName;
			return Meteor.twitterText.extractText('@xboxdash');
		// }
	}
});