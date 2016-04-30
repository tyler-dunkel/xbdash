Template.achievementsSinglePage.created = function() {}

Template.achievementsSinglePage.helpers({
	achievement: function () {
		var slug = Router.current().params.slug;
		return xbdAchievements.findOne({ slug: slug });
	},
	game: function() {
		return xbdGames.findOne({ _id: this.gameId });
	},
	achievementImage: function () {
		var image = "/img/achievement-default.jpg";
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
		var getImage  = '/img/achievement-default.jpg';
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
	},
});