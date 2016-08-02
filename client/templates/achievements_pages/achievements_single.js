Template.achievementsSinglePage.created = function() {
	DocHead.removeDocHeadAddedTags();
	var self = this,
		slug = Router.current().params.slug,
		gamertagSlug;
	this.subscribe('singleAchievement', slug);
	if (Meteor.user()) {
		gamertagSlug = Meteor.user().gamertagSlug;
		this.subscribe('userWishlist', gamertagSlug);
		this.subscribe('userTrophyCase', gamertagSlug);
	}
}

Template.achievementsSinglePage.helpers({
	achievement: function () {
		var slug = Router.current().params.slug;
		return xbdAchievements.findOne({ slug: slug });
	},
	game: function() {
		return xbdGames.findOne({ _id: this.gameId });
	},
	getValue: function() {
		if (this && this.value) {
			if (typeof this.value === 'number') {
				return this.value;
			} else {
				return 'N/A';
			}
		}
		return 'N/A';
	},
	achievementImage: function () {
		var image = "https://www.xbdash.com/img/achievement-default.jpg";
		if (this.mediaAssets) {
			image = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_1366,h_768/" + encodeURIComponent(this.mediaAssets);
		}
		return image;
	},
	ifXenon: function () {
		var gameD = xbdGames.findOne({ _id: this.gameId });
		if (gameD.platform === 'Xenon') {
			return 'img-x360';
		}
	},
	chkUserForAchievement: function () {
		var userId = Meteor.userId();
		var userAchievement = userAchievements.find({ achievementId: this._id, userId: userId });
		if (userAchievement && userAchievement.count() > 0) {
			console.log('achievement checked');
			return true;
		}
		return false; 
	},
	isUnlocked: function () {
		var userId = Meteor.userId();
		var userAchievement = userAchievements.find({ achievementId: this._id, userId: userId, progressState: true });
		if (userAchievement && userAchievement.count() > 0) {
			console.log('achievement unlocked');
			return true;
		}
		return false; 
	},
	achievementData: function () {
		var getImage  = 'https://www.xbdash.com/img/achievement-default.jpg';
		var getGame = xbdGames.findOne({ _id: this.gameId });

		if (getGame.platform === "Xenon") {
			getImage = "https://res.cloudinary.com/xbdash/image/fetch/w_1200,h_628,c_pad,b_rgb:000000/" + this.mediaAssets;
		}
		if (getGame.platform === "Durango") {
			getImage = this.mediaAssets;
		}
		
		return {
			title: 'I won the "' + this.name + '" achievement from ' + getGame.name + ' worth ' + this.value + ' Gamerscore! #xbox #xboxdash #xbdash',
			description: this.description,
			image: function () {
				return getImage;
			},
			author: 'xboxdash'
		}
	},
	achievementClass: function () {
		var userPercentage = this.userPercentage;
		var achievementClass = "xbd";
		if (userPercentage >= 0 && userPercentage <= 10) {
			achievementClass = "legendary";
		}
		if (userPercentage >= 11 && userPercentage <= 25) {
			achievementClass = "epic";
		}
		if (userPercentage >= 26 && userPercentage <= 50) {
			achievementClass = "rare";
		}
		if (userPercentage >= 51 && userPercentage <= 100) {
			achievementClass = "common";
		}
		return achievementClass;
	},
	trophyClass: function () {
		var userPercentage = this.userPercentage;
		var trophyClass = "xbd";
		if (userPercentage >= 0 && userPercentage <= 10) {
			trophyClass = "trophy";
		}
		if (userPercentage >= 11 && userPercentage <= 25) {
			trophyClass = "star";
		}
		if (userPercentage >= 26 && userPercentage <= 50) {
			trophyClass = "bullseye";
		}
		if (userPercentage >= 51 && userPercentage <= 100) {
			trophyClass = "unlock";
		}
		return trophyClass;
	}
});

Template.achievementSingleDocHead.created = function() {
	var game = xbdGames.findOne({ _id: this.data.gameId });
	var achievementSingleDescription = this.data.description;
	achievementSingleDescription = this.data.name + " achievement is worth " + this.data.value + " GamerScore. " + this.data.description;
	
	if (this.data.mediaAssets) {
		var achievementSingleImage = "https://res.cloudinary.com/xbdash/image/fetch/w_1200,h_628,c_pad,b_rgb:000000/" + this.data.mediaAssets;
	} else {
		var achievementSingleImage  = 'https://www.xbdash.com/img/achievement-default.jpg';
	}

	var achievementSingleTitle = this.data.name + " Achievement Solutions & Details - " + game.name + " | XBdash";
	var achievementSingleUrl = window.location.href;

	var achievementSingleDocHeadMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": achievementSingleDescription },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": achievementSingleDescription },
		{ "property": "og:image", "content": achievementSingleImage },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": achievementSingleTitle },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": achievementSingleUrl },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:url", "content": achievementSingleUrl },
		{ "name": "twitter:title", "content": achievementSingleTitle },
		{ "name": "twitter:description", "content": achievementSingleDescription },
		{ "name": "twitter:image:src", "content": achievementSingleImage },
		{ "name": "twitter:site", "content": "@xboxdash" }
	];

	var linkInfo = [
		{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": achievementSingleUrl },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
	];

	DocHead.setTitle(achievementSingleTitle);
	
	for(var i = 0; i < achievementSingleDocHeadMeta.length; i++) {
		DocHead.addMeta(achievementSingleDocHeadMeta[i]);;
	}

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}
}

Template.achievementWishlistArea.created = function() {
	var slug = Router.current().params.slug;
		gamertagSlug = Meteor.user().gamertagSlug;
	this.subscribe('singleAchievement', slug);
	this.subscribe('userWishlist', gamertagSlug);
}

Template.achievementWishlistArea.helpers({
	chkIfCompleted: function () {
		var userId = Meteor.userId();
		var userAchievement = userAchievements.find({ achievementId: this._id, userId: userId, progressState: true });
		if (userAchievement && userAchievement.count() > 0) {
			console.log('achievement unlocked');
			return true;
		}
		return false; 
	},
	chkUserWishlist: function() {
		var wishlistCount = userWishlists.find({ userId: Meteor.userId(), relationId: this._id }).count();
		if (wishlistCount > 0) {
			return true;
		}
	}
});

Template.achievementWishlistArea.events({
	'click .add-to-wish-list': function(e) {
		var achievement = xbdAchievements.findOne({ _id: this._id });
		Meteor.call('addToWishlist', 'achievement', achievement, function(err, res) {
			if (err) return;
			if (res) {
				if (res.status === 'warning') {
					$('.app-header-fixed').addClass('show-wishlist');
					return;
				} else {
					swal({
						title: res.title,
						text: res.reason,
						type: res.status
					});
					return;
				}
			}
		});
	},
	'click .remove-from-wish-list': function(e) {
		var self = this;
		var achievement = xbdAchievements.findOne({ _id: this._id });
		Meteor.call('removeFromWishlist', 'achievement', achievement, function(err, res) {
			if (err) return;
			if (res) {
				swal({
					title: res.title,
					text: res.reason,
					type: res.status
				});
				return;
			}
		});
	}
});

Template.achievementTrophyCaseArea.created = function() {
	var slug = Router.current().params.slug;
		gamertagSlug = Meteor.user().gamertagSlug;
	this.subscribe('singleAchievement', slug);
	this.subscribe('userTrophyCase', gamertagSlug);
}

Template.achievementTrophyCaseArea.helpers({
	chkIfCompleted: function () {
		var userId = Meteor.userId();
		var userAchievement = userAchievements.find({ achievementId: this._id, userId: userId, progressState: true });
		if (userAchievement && userAchievement.count() > 0) {
			console.log('achievement unlocked');
			return true;
		}
		return false; 
	},
	chkUserTrophyCase: function() {
		var trophyCaseCount = trophyCase.find({ userId: Meteor.userId(), relationId: this._id }).count();
		if (trophyCaseCount > 0) {
			return true;
		}
	}
});

Template.achievementTrophyCaseArea.events({
	'click .add-to-trophy-case': function(e) {
		console.log(this);
		var achievement = xbdAchievements.findOne({ _id: this._id });
		Meteor.call('addToTrophyCase', 'achievement', achievement, function(err, res) {
			if (err) return;
			if (res) {
				if (res.status === 'warning') {
					$('.app-header-fixed').addClass('show-trophy-case');
					return;
				} else {
					swal({
						title: res.title,
						text: res.reason,
						type: res.status
					});
					return;
				}
			}
		});
	},
	'click .remove-from-trophy-case': function(e) {
		var self = this;
		var achievement = xbdAchievements.findOne({ _id: this._id });
		Meteor.call('removeFromTrophyCase', 'achievement', achievement, function(err, res) {
			if (err) return;
			if (res) {
				swal({
					title: res.title,
					text: res.reason,
					type: res.status
				});
				return;
			}
		});
	}
});

Template.achievementShareButtons.helpers({
	getUrl: function () {
		var slug = Router.current().params.slug;
		return window.location.href;
	},
	getTitle: function() {
		var getGame = xbdGames.findOne({ _id: this.gameId });
		return 'I won the "' + this.name + '" achievement from ' + getGame.name + ' worth ' + this.value + ' GS!';
	},
	getShortDescription: function () {
		var achievementDescription = this.description;
		achievementDescription = this.name + " achievement is worth " + this.value + " GamerScore. " + achievementDescription.substr(0,62) + '...';
		return achievementDescription;
	},
	getShareImage: function () {
		var achievementImage  = 'https://www.xbdash.com/img/achievement-default.jpg';
		var getGame = xbdGames.findOne({ _id: this.gameId });

		if (getGame.platform === "Xenon") {
			achievementImage = "https://res.cloudinary.com/xbdash/image/fetch/w_1200,h_628,c_pad,b_rgb:000000/" + this.mediaAssets;
		}
		if (getGame.platform === "Durango") {
			achievementImage = "https://res.cloudinary.com/xbdash/image/fetch/w_1200,h_628,c_pad,b_rgb:000000/" + this.mediaAssets;
		}

		return achievementImage;
	},
	getHashTags: function() {
		return 'xbox,xbdash,gamerscore';
	}
});

Template.achievementPercentageArea.rendered = function() {
	$(document).ready(function() {
		$('.glyphicon-info-sign').tooltip();
	});
}