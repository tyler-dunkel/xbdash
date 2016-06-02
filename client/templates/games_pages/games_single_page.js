var achievementsLimit = new ReactiveVar();

Template.gamesSinglePageNew.created = function() {
	var slug = Router.current().params.slug;
	this.subscribe('singleGame', slug);
}

Template.gamesSinglePageNew.helpers({
	game: function () {
		if (Template.instance().subscriptionsReady()) {
			var slug = Router.current().params.slug;
			var game = xbdGames.findOne({ slug: slug });
			if (game && game._id) {
				return gameDetails.findOne({ gameId: game._id });
			}
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
	gameData: function () {
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
				
		return {
			title: 'I completed ' + this.gameName + '! #xbox #xboxdash #xbdash',
			description: this.gameReducedDescription,
			image: function () {
				return getImage;
			},
			author: 'xboxdash'
		}
	},
	dateFormat: function () {
		return moment(this.gameReleaseDate).format('l');
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
});

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

	this.autorun(function() {
		Meteor.subscribe('singleGameAchievements', slug, achievementsLimit.get());
	});
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

amzn_assoc_placement = "adunit0";amzn_assoc_enable_interest_ads = "true";amzn_assoc_tracking_id = "xbdash-20";amzn_assoc_ad_mode = "auto";amzn_assoc_ad_type = "smart";amzn_assoc_marketplace = "amazon";amzn_assoc_region = "US";amzn_assoc_linkid = "53a282e17ec77b7ea536f5c81dba5683";amzn_assoc_emphasize_categories = "979455011,468642";amzn_assoc_fallback_mode = {"type":"search","value":"xbox overwatch"};amzn_assoc_default_category = "VideoGames";

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