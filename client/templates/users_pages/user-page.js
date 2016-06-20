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
		var image = "/img/xbdash_greenicon.png";
		if (user && user.gamercard && user.gamercard.gamerpicLargeSslImagePath) {
			image = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_96,h_96/" + encodeURIComponent(user.gamercard.gamerpicLargeSslImagePath);
		}
		if (user && user.xboxProfile) {
			image = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_96,h_96/" + encodeURIComponent(user.xboxProfile.gameDisplayPicRaw);
		}
		return image;
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

Template.userRankArea.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	this.subscribe('userRanks', gamertagSlug);
}

Template.userRankArea.helpers({
	usersDailyRank: function() {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var userLb = userLeaderboards.findOne({ userId: user._id });
		if (userLb && userLb.dailyRank && userLb.dailyRank.rank > 0) {
			return userLb.dailyRank.rank;
		}
		return '---';
	},
	usersOverallRank: function() {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var userLb = userLeaderboards.findOne({ userId: user._id });
		if (userLb && userLb.overallRank > 0) {
			return userLb.overallRank;
		}
		return '---';
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
		if (userActivity.activityList) {
			return userActivity.activityList;
		} else {
			return [];
		}
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
	chkUserAchievements: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var count = userAchievements.find({ userId: user._id }).count();
		if (count > 0) return true;
		return false;
	},
	userAchievement: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var userAchis = userAchievements.find({ userId: user._id });
		return userAchis;
	},
	achievementSlug: function () {
		var achievement = xbdAchievements.findOne({ _id: this.achievementId });
		return achievement.slug;
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
	chkUserGames: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var count = userGames.find({ userId: user._id }).count();
		if (count > 0) return true;
		return false;
	},
	userGame: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var userGame = userGames.find({ userId: user._id });
		return userGame;
	},
	gameSlug: function () {
		var game = xbdGames.findOne({ _id: this.gameId });
		return game.slug;
	},
	getGameImage: function () {
		var game = xbdGames.findOne({ _id: this.gameId });
		var gameDets = gameDetails.findOne({ gameId: this.gameId });
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
					image = "https://res.cloudinary.com/xbdash/image/fetch/c_fill,w_40,h_55/" + encodeURIComponent(art.Url);
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

Template.userClips.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	this.subscribe('userClips', gamertagSlug);
	this.counter = 0;
}

Template.userClips.rendered = function() {
}

Template.userClips.helpers({
	chkClips: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var gameClip = gameClips.find({ userId: user._id });
		var gameClipCount = gameClip.count();
		if (gameClipCount > 0) return true;
		return false;
	},
	clip: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var gameClip = gameClips.find({ userId: user._id });
		return gameClip;
	},
	getUserGamertag: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		return user.gamercard.gamertag;
	},
	getLargeThumbnail: function () {
		var imageUri;
		this.thumbnails.forEach(function(thumbs) {
			if (thumbs.thumbnailType === "Large") {
				imageUri = thumbs.uri;
			}
		});
		return imageUri;
	},
	getClipUri: function () {
		var clipUri;
		this.gameClipUris.forEach(function(clips) {
			if (clips.uriType === "Download") {
				clipUri = clips.uri;
			}
		});
		return clipUri;
	}
});

Template.userClips.events({
	'click .clips-container .row .large': function(e) {
		$('#clips-modal .modal-body .carousel-inner').empty();

		$('.clips-container .row .large').each(function(index) {
			$(this).attr('data-slide', String(index + 1));
		});

		var image = $(e.currentTarget).attr('src');
		var video = $(e.currentTarget).attr('data-video');
		var dataSlide = $(e.currentTarget).attr('data-slide');

		$('#clips-modal .modal-body .carousel-inner').append('<video poster="' + image + '" data-slide="' + dataSlide + '" data-setup="{&quot;controls&quot;: true,&quot;preload&quot;: &quot;auto&quot;,&quot;autoplay&quot;: false,&quot;playbackRates&quot;: [0.5, 1, 1.5, 2] }" preload="auto" id="video_display_html5_api" class="vjs-tech" style="width:100%;"><source src="' + video + '" type="video/mp4"></video>');

		$('#clips-modal').modal('show');
	},
	'click #clips-modal .close': function() {
		$('#clips-modal .modal-body .carousel-inner').empty();
	},
	'click #clips-modal [data-dismiss="modal"]': function() {
		$('#clips-modal .modal-body .carousel-inner').empty();
	},
	'click .carousel-control.left': function() {
		var index = $('.vjs-tech').attr('data-slide');
		if (index === '1') {
			return;
		}
		var nextIndex = String(index - 1);
		$('#clips-modal .modal-body .carousel-inner').empty();
		var nextSlideSel = '[data-slide="' + nextIndex + '"]';
		var image = $(nextSlideSel).attr('src');
		var video = $(nextSlideSel).attr('data-video');
		var dataSlide = $(nextSlideSel).attr('data-slide');
		$('#clips-modal .modal-body .carousel-inner').append('<video poster="' + image + '" data-slide="' + dataSlide + '" data-setup="{"controls": true,"preload": "auto","autoplay": false,"playbackRates": [0.5, 1, 1.5, 2] }" preload="auto" id="video_display_html5_api" class="vjs-tech" style="width:100%;"><source src="' + video + '" type="video/mp4"></video>');
	},
	'click .carousel-control.right': function() {
		var index = $('.vjs-tech').attr('data-slide');
		if (index === '6') {
			return;
		}
		var nextIndex = parseInt(index) + 1;
		$('#clips-modal .modal-body .carousel-inner').empty();
		var nextSlideSel = '[data-slide="' + nextIndex + '"]';
		var image = $(nextSlideSel).attr('src');
		var video = $(nextSlideSel).attr('data-video');
		var dataSlide = $(nextSlideSel).attr('data-slide');
		$('#clips-modal .modal-body .carousel-inner').append('<video poster="' + image + '" data-slide="' + dataSlide + '" data-setup="{"controls": true,"preload": "auto","autoplay": false,"playbackRates": [0.5, 1, 1.5, 2] }" preload="auto" id="video_display_html5_api" class="vjs-tech" style="width:100%;"><source src="' + video + '" type="video/mp4"></video>');
	}
});

Template.userCaptures.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	this.subscribe('userCaptures', gamertagSlug);
	this.counter = 0;
}

Template.userCaptures.rendered = function() {
}

Template.userCaptures.helpers({
	chkCaptures: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var imageCapture = screenShots.find({ userId: user._id });
		var imageCount = imageCapture.count();
		if (imageCount > 0) return true;
		return false;
	},
	capture: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var imageCapture = screenShots.find({ userId: user._id });
		return imageCapture;
	},
	getUserGamertag: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		return user.gamercard.gamertag;
	},
	getLargeThumbnail: function () {
		var imageUri;
		this.thumbnails.forEach(function(thumbs) {
			if (thumbs.thumbnailType === "Large") {
				imageUri = thumbs.uri;
			}
		});
		return imageUri;
	}

});

Template.userCaptures.events({
	'click .captures-container .row .large': function(e) {
		$('#captures-modal .modal-body .carousel-inner').empty();

		$('.captures-container .row .large').each(function(index) {
			$(this).attr('data-slide', String(index + 1));
		});

		var image = $(e.currentTarget).attr('src');
		var dataSlide = $(e.currentTarget).attr('data-slide');

		$('#captures-modal .modal-body .carousel-inner').append('<img src="' + image + '" data-slide="' + dataSlide + '" />');

		$('#captures-modal').modal('show');
	},
	'click #captures-modal .close': function() {
		console.log('im closed');
		$('#captures-modal .modal-body .carousel-inner').empty();
	},
	'click #captures-modal [data-dismiss="modal"]': function() {
		console.log('im closed');
		$('#captures-modal .modal-body .carousel-inner').empty();
	},
	'click .carousel-control.left': function() {
		var index = $('.#captures-modal .modal-body .carousel-inner').attr('data-slide');
		if (index === '1') {
			return;
		}
		var nextIndex = String(index - 1);
		$('#captures-modal .modal-body .carousel-inner').empty();
		var nextSlideSel = '[data-slide="' + nextIndex + '"]';
	},
	'click .carousel-control.right': function() {
		var index = $('.#captures-modal .modal-body .carousel-inner').attr('data-slide');
		if (index === '6') {
			return;
		}
		var nextIndex = parseInt(index) + 1;
		$('#captures-modal .modal-body .carousel-inner').empty();
		var nextSlideSel = '[data-slide="' + nextIndex + '"]';
	}
});

Template.userBadges.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	this.subscribe('userBadges', gamertagSlug);
}

Template.userBadges.helpers({
	getUserGamertag: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		return user.gamercard.gamertag;
	},
	user: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		return Meteor.users.findOne({ gamertagSlug: gamertagSlug });
	},
	badge: function () {
		return xbdBadges.findOne({ userId: this._id });
	},
	chkFiveGSBadge: function () {
		if (this.fiveGS) return true;
		return false;
	},
	chkTenGSBadge: function () {
		if (this.tenGS) return true;
		return false;
	},
	chkTwentyGSBadge: function () {
		if (this.twentyGS) return true;
		return false;
	},
	chkFiftyGSBadge: function () {
		if (this.fiftyGS) return true;
		return false;
	},
	chkOneHundredGSBadge: function () {
		if (this.oneHundredGS) return true;
		return false;
	},
	chkTwoFiftyHundredGSBadge: function () {
		if (this.twoFiftyHundredGS) return true;
		return false;
	},
	chkSevenFiftyHundredGSBadge: function () {
		if (this.sevenFiftyHundredGS) return true;
		return false;
	},
	chkNineHundredGSBadge: function () {
		if (this.nineHundredGS) return true;
		return false;
	},
	chkTwoMillionGSBadge: function () {
		if (this.twoMillionGS) return true;
		return false;
	},
	chkOneGameBadge: function () {
		if (this.oneGame) return true;
		return false;
	},
	chkTenGameBadge: function () {
		if (this.tenGame) return true;
		return false;
	},
	chkOneHundredGameBadge: function () {
		if (this.oneHundredGame) return true;
		return false;
	},
	chkFiveHundredGameBadge: function () {
		if (this.fiveHundredGame) return true;
		return false;
	},
	chkOneThousandGameBadge: function () {
		if (this.oneThousandGame) return true;
		return false;
	},
	chkSolutionExpertBadge: function () {
		if (this.solutionExpert) return true;
		return false;
	},
	chkEagleScoutBadge: function () {
		if (this.eagleScout) return true;
		return false;
	}
});

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

Template.xbdTweets.created = function() {
	var gamertagSlug = Router.current().params.gamertagSlug;
	this.subscribe('userProfile', gamertagSlug);

	var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
	var self = this;
	var screenName;

	if (user && user.services.twitter) {
		screenName = user.services.twitter.screenName;
	} else {
		screenName = 'xboxdash';
	}

	self.tweetText = new ReactiveVar();

	Meteor.call('getTweets', screenName, function(err, result) {
		if (err) { console.log(err) }
		self.tweetText.set(result);
	});
}

Template.xbdTweets.helpers({
	getTwitterScreenName: function () {
		var gamertagSlug = Router.current().params.gamertagSlug;
		var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
		var screenName;
		if (user && user.services.twitter) {
			return user.services.twitter.screenName;
		}
		return 'xboxdash';
	},
	userTweet: function () {
		var tweets = Template.instance().tweetText.get();
		if (tweets && tweets.result) {
			return tweets.result;
		}
		return [];
	},
	tweetDate: function () {
		if (this && this.created_at) {
			return moment(this.created_at).fromNow();
		}
		return '';
	}
});