Template.userProfilePage.created = function() {
	DocHead.removeDocHeadAddedTags();

	var gamertagSlug = Router.current().params.gamertagSlug;

	this.subscribe('userProfile', gamertagSlug);
}

Template.userProfilePage.helpers({
	user: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		return Meteor.users.find({ gamertagSlug: gamertagSlug });
	}
});

Template.userDocHead.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });

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
}

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
	},
	getGamerscore: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		if (user && user.gamercard) {
			return user.gamercard.gamerscore;
		}
	}
});

Template.userActivity.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	this.subscribe('userActivity', gamertagSlug);
}

Template.userActivity.helpers({
	activity: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var userActivity = recentActivity.findOne({ userId: user._id });
		return userActivity.activityList;
	},
	getActivityImage: function () {
		return "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_40,h_40/" + encodeURIComponent(this.contentImageUri);
	},
	getStartTime: function () {
		return moment(this.startTime).calendar();
	}
});

// Template.activityImage.created = function() {
// 	this.subscribe('gameDetails', this.data.titleId);
// }

// Template.activityImage.helpers({
// 	getActivityImage: function () {
// 		var game = gameDetails.findOne({ gameId: this.titleId });
// 		console.log(game);
// 	},
// 	gameImage: function() {
// 	}
// });

Template.userAchievements.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	this.subscribe('userAchievements', gamertagSlug);
}

Template.userAchievements.helpers({
	achievement: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var userAchis = userAchievements.find({ userId: user._id });
		return userAchis;
	},
	getAchievementImage: function () {
		var achievement = xbdAchievements.findOne({ _id: this.achievementId });
		var image = "https://www.xbdash.com/img/achievement-default.jpg";

		if (achievement.mediaAssets) {
			image = "https://res.cloudinary.com/xbdash/image/fetch/c_fill,w_40,h_40/" + encodeURIComponent(achievement.mediaAssets);;
		}

		return image;
	},
	getAchievementName: function () {
		var achievement = xbdAchievements.findOne({ _id: this.achievementId });
		return achievement.name;
	},
	getUnlockedDate: function () {
		return moment(this.progression).calendar();
	},
	getUserGamertag: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		return user.gamercard.gamertag;
	},
	getGameName: function () {
		var achievement = xbdAchievements.findOne({ _id: this.achievementId });
		var game = xbdGames.findOne({ _id: achievement.gameId });
		return game.name;
	},
	getAchievementValue: function () {
		var achievement = xbdAchievements.findOne({ _id: this.achievementId });
		return achievement.value;
	}
});

Template.userGames.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	this.subscribe('userGames', gamertagSlug);
}

Template.userGames.helpers({
	game: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var userGame = userGames.find({ userId: user._id });
		return userGame;
	},
	getGameImage: function () {
		var game = xbdGames.findOne({ _id: this.gameId });
		var gameDets = gameDetails.findOne({ gameId: this.gameId });
		console.log(gameDets);
		var image = "/img/game-default.jpg";

		if (game.platform === 'Xenon') {
			gameDets.gameArt.forEach(function(art) {
				if (art.Purpose === 'BoxArt' && art.Width === 219) {
					image = "https://res.cloudinary.com/xbdash/image/fetch/c_fill,w_40,h_55/" + encodeURIComponent(art.Url);
				}
			});
		}
		if (game.platform === 'Durango') {
			gameDets.gameArt.forEach(function(art) {
				if (art.Purpose === 'BrandedKeyArt' && art.Width === 584) {
					image = "https://res.cloudinary.com/xbdash/image/fetch/c_fill,w_40,h_55" + encodeURIComponent(art.Url);
				}
			});
		}

		return image;
	},
	getGameName: function () {
		var game = xbdGames.findOne({ _id: this.gameId });
		return game.name;
	},
	getUnlockedDate: function () {
		return moment(this.lastUnlock).calendar();
	},
	getUserGamertag: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		return user.gamercard.gamertag;
	}
});

// Template.userClips.created = function() {
// 	var gamertagSlug = Router.current().params.gamertagSlug;
// 	this.subscribe('userClips', gamertagSlug);
// }

// Template.userCaptures.created = function() {
// 	var gamertagSlug = Router.current().params.gamertagSlug;
// 	this.subscribe('userCaptures', gamertagSlug);
// }

// Template.userBadges.created = function() {
// 	var gamertagSlug = Router.current().params.gamertagSlug;
// 	this.subscribe('userBadges', gamertagSlug);
// }

// Template.userWishlist.created = function() {
// 	var gamertagSlug = Router.current().params.gamertagSlug;
// 	this.subscribe('userWishlist', gamertagSlug);
// }

// Template.userTrophyCase.created = function() {
// 	var gamertagSlug = Router.current().params.gamertagSlug;
// 	this.subscribe('userTrophyCase', gamertagSlug);
// }

// Template.xbdAnnouncements.created = function() {
// 	var gamertagSlug = Router.current().params.gamertagSlug;
// 	this.subscribe('xbdAnnouncements', gamertagSlug);
// }

// Template.xbdTweets.helpers({
// 	getTwitterScreenName: function () {
// 		var user = Meteor.users.find({ _id: this._id });
// 		if (user && user.services) {
// 			return user.services.twitter.screenName;
// 		}
// 	},
// 	getTweets: function () {
// 		// var gamertagSlug = Router.current().params.gamertagSlug;
// 		// var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
// 		// if (user && user.services) {
// 		// 	console.log(user.services);
// 		// 	var twitterScreenName = user.services.twitter.screenName;
// 			// return Meteor.twitterText.extract('@xboxdash');
// 		// }
// 	}
// });