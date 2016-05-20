var achievementLimit = new ReactiveVar();

Template.achievementsShowMorePage.created = function() {
	this.autorun(function() {
		var options = Router.current().params.query;
		options.limit = achievementLimit.get();
		Meteor.subscribe('achievementShowMore', options);
	});
}

Template.achievementsShowMoreApp.created = function() {
	console.log('this fired');
	this.options = Router.current().params.query,
	validVals = ['epic', 'legendary', 'common', 'rare'];
}

Template.achievementsShowMoreApp.helpers({
	'achievementTier': function() {
		if (Template.instance().options.tier) {
			return Template.instance().options.tier;
		} else {
			return 'hello';
		}
	},
	'achievementPercentage': function() {
		var c = Template.instance().options.tier;
		if (c === 'epic') {
			return '11 to 25 percent';
		}
		if (c === 'legendary') {
			return '0 to 10 percent';
		}
		if (c === 'common') {
			return '51 to 100 percent';
		}
		if (c === 'rare') {
			return '26 to 50 percent';
		}
	}
});

Template.achievementsShowMoreSection.created = function() {
	var limit, self = this;
	achievementLimit.set(25);
	console.log(this.data);
}

Template.achievementsShowMoreSection.rendered = function() {
	$(window).scroll(function() {
		window.setTimeout(function() {
			showMoreVisible();
		}, 500);
	});
}

Template.achievementsShowMoreSection.helpers({
	achievementList: function() {
		return xbdAchievements.find({}, {
			sort: {
				userPercentage: -1,
				name: 1
			},
			limit: achievementLimit.get()
		}).fetch();
	},
	hasMoreResults: function() {
		var achievementLimitCurrent = achievementLimit.get();
		var xbdAcheivementCount = xbdAchievements.find({}).count();
		return ! (xbdAcheivementCount < achievementLimitCurrent);
	},
	chkPlatform: function () {
		var game = xbdGames.findOne({ _id: this.gameId });
		if (game.platform === 'Xenon') {
			return 'thumb-md2';
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
	achievementImage: function () {
		var image = "/img/achievement-default.jpg";
		if (this.mediaAssets) {
			image = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_96,h_96/" + encodeURIComponent(this.mediaAssets);
		}
		return image;
	},
	gamesImage: function () {
		var game = xbdGames.findOne({ _id: this.gameId });
		var gameDetail = gameDetails.findOne({ gameId: this.gameId });
		var image = "/img/game-default.jpg";
		if (game.platform === 'Xenon') {
			gameDetail.gameArt.forEach(function(art) {
				if (art.Purpose === 'BoxArt' && art.Width === 219) {
					image = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_96/" + encodeURIComponent(art.Url);
				}
			});
		}
		if (game.platform === 'Durango') {
			gameDetail.gameArt.forEach(function(art) {
				if (art.Purpose === 'BrandedKeyArt' && art.Width === 584) {
					image = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_96/" + encodeURIComponent(art.Url);
				}
			});
		}
		return image;
	},
	gameName: function () {
		var gameDetail = gameDetails.findOne({ gameId: this.gameId });
		return gameDetail.gameReducedName;
	}
});

function showMoreVisible() {
	var threshold, target = $("#hasMoreResults");
	if (!target.length) return;
	threshold = $(window).scrollTop() + $(window).height() - target.height();
	if (target.offset().top < threshold) {
		console.log(target.data);
		if (!target.data("visible")) {
			target.data("visible", true);
			achievementLimit.set(achievementLimit.get() + 9);
		}
	} else {
		if (target.data("visible")) {
			target.data("visible", false);
		}
	}
}