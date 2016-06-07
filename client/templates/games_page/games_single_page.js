var achievementsLimit = new ReactiveVar();

Template.gamesSinglePageNew.created = function() {
	DocHead.removeDocHeadAddedTags();
	var slug = Router.current().params.slug;
	this.subscribe('singleGame', slug);
}

Template.gamesSinglePageNew.helpers({
	game: function () {
		var slug = Router.current().params.slug;
		var game = xbdGames.findOne({ slug: slug });
		if (game && game._id) {
			return gameDetails.findOne({ gameId: game._id });
		}
	},
	chkCompleted: function () {
		var user = Meteor.user();
		if (user) {
			if (user.gamertagScanned.status === 'true' || user.gamertagScanned.status === 'updating') {
				var game = userGames.findOne({ gameId: this.gameId });
				if (game && game.completed) {
					return true;
				}
				return false;
			}
			return false;
		}
		return false;
	},
	gamesImage: function () {
		var game = xbdGames.findOne({ _id: this.gameId });
		var image = "/img/game-default.jpg";

		if (game.platform === 'Xenon') {
			this.gameArt.forEach(function(art) {
				if (art.Purpose === 'BoxArt' && art.Width === 219) {
					image = "https://res.cloudinary.com/xbdash/image/fetch/h_628,c_scale/" + encodeURIComponent(art.Url);
				}
			});
		}
		if (game.platform === 'Durango') {
			this.gameArt.forEach(function(art) {
				if (art.Purpose === 'BrandedKeyArt' && art.Width === 584) {
					image = "https://res.cloudinary.com/xbdash/image/fetch/" + encodeURIComponent(art.Url);
				}
			});
		}

		return image;
	},
	gamePlatform: function () {
		var game = xbdGames.findOne({ _id: this.gameId });
		if (game.platform == 'Durango') {
			return 'Xbox One';
		}
		if (game.platform == 'Xenon') {
			return 'Xbox 360';
		}
		return 'Xbox';
	},
	chkUserForGame: function () {
		var userId = Meteor.userId();
		var userGame = userGames.find({ gameId: this.gameId, userId: userId });
		if (userGame && userGame.count() > 0) return true;
		return false; 
	},
	chkIfCompleted: function () {
		var userId = Meteor.userId();
		var userGame = userGames.findOne({ gameId: this.gameId, userId: userId });
		return userGame.completed;
	},
	dateFormat: function () {
		return moment(this.gameReleaseDate).format('l');
	}
});

Template.gameDocHead.created = function() {
	var slug = Router.current().params.slug;
	var game = xbdGames.findOne({ slug: slug });
	var gameDescription = this.data.gameDescription;
	gameDescription = game.name + " has a total of " + game.maxGamerscore + " GamerScore. " + gameDescription.substr(0,62) + '...';
	var getImage = "/img/game-default.jpg";
	var gameUrl = window.location.href;

	if (game.platform === 'Xenon') {
		this.data.gameArt.forEach(function(art) {
			if (art.Purpose === 'BoxArt' && art.Width === 219) {
				getImage = "https://res.cloudinary.com/xbdash/image/fetch/w_1200,h_628,c_pad,b_rgb:000000/" + art.Url;
			}
		});
	}
	if (game.platform === 'Durango') {
		this.data.gameArt.forEach(function(art) {
			if (art.Purpose === 'BrandedKeyArt' && art.Width === 584) {
				getImage = "https://res.cloudinary.com/xbdash/image/fetch/w_1200,h_628,c_pad,b_rgb:000000/" + art.Url;
			}
		});
	}

	var gameDocHeadMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": gameDescription },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": gameDescription },
		{ "property": "og:image", "content": getImage },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": game.name + " Achievements | XBdash" },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": gameUrl },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:url", "content": gameUrl },
		{ "name": "twitter:title", "content": game.name + " Achievements | XBdash" },
		{ "name": "twitter:description", "content": gameDescription },
		{ "name": "twitter:image:src", "content": getImage },
		{ "name": "twitter:site", "content": "@xboxdash" }
	];

	var linkInfo = [
		{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": gameUrl },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
	];

	DocHead.setTitle(game.name + " Achievements | XBdash");

	//" + game.name + " has a total of " + game.maxGamerscore + " GamerScore.

	for(var i = 0; i < gameDocHeadMeta.length; i++) {
		DocHead.addMeta(gameDocHeadMeta[i]);;
	}

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}
}

Template.userGamerscoreInfoNew.created = function() {
	var slug = Router.current().params.slug;
	this.subscribe('singleGame', slug);
}

Template.userGamerscoreInfoNew.helpers({
	userCurrentGamerscore: function () {
		var userId = Meteor.userId();
		var game = userGames.findOne({ userId: userId, gameId: this.gameId });
		if (game && game.currentGamerscore) {
			return game.currentGamerscore;
		}
	},
	userCurrentAchievements: function () {
		var userId = Meteor.userId();
		var game = userGames.findOne({ userId: userId, gameId: this.gameId });
		if (game && game.earnedAchievements) {
			return game.earnedAchievements;
		}
	}
});

Template.gamerscoreInfoNew.created = function() {
	var slug = Router.current().params.slug;
	this.subscribe('singleGame', slug);
}

Template.gamerscoreInfoNew.helpers({
	gameMaxGamerscore: function () {
		var game = xbdGames.findOne({ _id: this.gameId });
		if (game && game.maxGamerscore) {
			return game.maxGamerscore;
		}
	},
	gameMaxAchievements: function() {
		return xbdAchievements.find({ gameId: this.gameId }).count();
	}
});

Template.gamesSinglePageAchievementNew.created = function() {
	var slug = Router.current().params.slug;
	achievementsLimit.set(15);
	this.subscribe('singleGameAchievements', slug, achievementsLimit.get());
}

Template.gamesSinglePageAchievementNew.rendered = function() {
	$(window).scroll(function() {
		window.setTimeout(function() {
			showMoreVisible();
		}, 500);
	});
}

Template.gamesSinglePageAchievementNew.helpers({
	achievementsList: function () {
		return xbdAchievements.find({ gameId: this.gameId }, {
			sort: {
				value: 1,
				name: 1
			},
			limit: achievementsLimit.get(),
		});
	},
	hasMoreResults: function() {
		var achievementsLimitCurrent = achievementsLimit.get();
		var xbdAchievementsCount = xbdAchievements.find({}).count();
		return ! (xbdAchievementsCount < achievementsLimitCurrent);
	},
	chkProgress: function () {
		var user = Meteor.user();
		if (user) {
			if (user.gamertagScanned.status === 'true' || user.gamertagScanned.status === 'updating') {
				var userAchievement = userAchievements.findOne({ userId: user._id, achievementId: this._id });
				if (userAchievement && userAchievement.progressState) {
					return true;
				}
			}
			return false;
		}
		return false;
	},
	chkPlatform: function () {
		var game = xbdGames.findOne({ _id: this.gameId });
		if (game.platform === 'Xenon') {
			return 'thumb-md2';
		}
	},
	achievementImage: function () {
		var image = "/img/achievement-default.jpg";
		if (this.mediaAssets) {
			image = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_96,h_96/" + encodeURIComponent(this.mediaAssets);
		}
		return image;
	},
	achievementClass: function () {
		var userPercentage = this.userPercentage;
		var achievementClass = "xbd";
		if (userPercentage >= 51 && userPercentage <= 100) {
			achievementClass = "common";
		}
		if (userPercentage >= 26 && userPercentage <= 50) {
			achievementClass = "rare";
		}
		if (userPercentage >= 11 && userPercentage <= 25) {
			achievementClass = "epic";
		}
		if (userPercentage >= 0 && userPercentage <= 10) {
			achievementClass = "legendary";
		}
		return achievementClass;
	},
	trophyClass: function () {
		var userPercentage = this.userPercentage;
		var trophyClass = "xbd";
		if (userPercentage >= 51 && userPercentage <= 100) {
			trophyClass = "unlock";
		}
		if (userPercentage >= 26 && userPercentage <= 50) {
			trophyClass = "bullseye";
		}
		if (userPercentage >= 11 && userPercentage <= 25) {
			trophyClass = "star";
		}
		if (userPercentage >= 0 && userPercentage <= 10) {
			trophyClass = "trophy";
		}
		return trophyClass;
	}
});

Template.amznSmartAd.rendered = function() {
	$(document).ready(function() {
		var container = document.getElementById("amzn-smart-ad");
		var script1 = document.createElement( 'script' );
		var script2 = document.createElement( 'script' );

		script1.type = "text/javascript";
		script1.innerHTML = 'amzn_assoc_placement = "adunit0";amzn_assoc_enable_interest_ads = "true";amzn_assoc_tracking_id = "xbdash-20";amzn_assoc_ad_mode = "auto";amzn_assoc_ad_type = "smart";amzn_assoc_marketplace = "amazon";amzn_assoc_region = "US";amzn_assoc_linkid = "53a282e17ec77b7ea536f5c81dba5683";amzn_assoc_emphasize_categories = "979455011,468642";amzn_assoc_fallback_mode = {"type":"search","value":"xbox overwatch"};amzn_assoc_default_category = "VideoGames";';
		container.appendChild(script1);

		script2.src = "//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US";
		container.appendChild(script2);	
	});
}

Template.gameShareButtons.helpers({
	getUrl: function () {
		var slug = Router.current().params.slug;
		return window.location.href;
	},
	getTitle: function() {
		return 'I completed ' + this.gameName + '! #xbox #xboxdash #xbdash';
	},
	getShortDescription: function () {
		var singleGame = gameDetails.findOne({ gameId: this.gameId });
		var gameDescription = singleGame.gameDescription;
		return gameDescription.substr(0,70) + '...';
	},
	getShareImage: function () {
		var game = xbdGames.findOne({ _id: this.gameId });
		var getImage = "/img/game-default.jpg";

		if (game.platform === 'Xenon') {
			this.gameArt.forEach(function(art) {
				if (art.Purpose === 'BoxArt' && art.Width === 219) {
					getImage = "https://res.cloudinary.com/xbdash/image/fetch/w_1200,h_628,c_pad,b_rgb:000000/" + art.Url;
				}
			});
		}
		if (game.platform === 'Durango') {
			this.gameArt.forEach(function(art) {
				if (art.Purpose === 'BrandedKeyArt' && art.Width === 584) {
					getImage = "https://res.cloudinary.com/xbdash/image/fetch/w_1200,h_628,c_pad,b_rgb:000000/" + art.Url;
				}
			});
		}

		return getImage;
	}
});

function showMoreVisible() {
	var threshold, target = $("#hasMoreResults");
	if (!target.length) return;
	threshold = $(window).scrollTop() + $(window).height() - target.height();
	if (target.offset().top < threshold) {
		console.log(target.data);
		// if (!target.data("visible")) {
			target.data("visible", true);
			var newLimit = achievementsLimit.get() + 6;
			achievementsLimit.set(achievementsLimit.get() + 6);
		// }
	} else {
		// if (target.data("visible")) {
			target.data("visible", false);
		// }
	}
}