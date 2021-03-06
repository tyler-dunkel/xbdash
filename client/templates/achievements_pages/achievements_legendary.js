Template.topLegendaryAchievements.created = function() {
	this.subscribe('topLegendaryAchievements');
}

Template.topLegendaryAchievements.events({
	"click .panel-heading": function(e) {
		e.preventDefault();
		Router.go('achievementsPage', {}, { query: 'tier=legendary' });
	},
	"mouseover .panel-heading": function() {
		$('.bg-legendary .view-button').removeClass("inline");
		$('.bg-legendary .view-button').addClass("none");
		$('.bg-legendary .view-arrow').removeClass("none");
		$('.bg-legendary .view-arrow').addClass("inline");
	},
	"mouseout .panel-heading": function() {
		$('.bg-legendary .view-button').removeClass("none");
		$('.bg-legendary .view-button').addClass("inline");
		$('.bg-legendary .view-arrow').removeClass("inline");
		$('.bg-legendary .view-arrow').addClass("none");
	}
});

Template.topLegendaryAchievements.helpers({
	achievementsPresent: function() {
		var achievements = xbdAchievements.find({
			userPercentage: { $gte: 0, $lte: 10 }
		}).count();
		if (achievements > 0) {
			return true;
		}
		return false;
	},
	topLegendaryAchievements: function() {
		var achievements = xbdAchievements.find({
			userPercentage: { $gte: 0, $lte: 10 }
		}, { sort: { userPercentage: -1 }, limit: 10 });
		if (achievements) {
			return achievements;
		}
	},
	gameName: function() {
		var xbdGame = xbdGames.findOne({ _id: this.gameId });
		if (xbdGame && xbdGame.name) {
			return xbdGame.name;
		}
		return;
	},
	gameSlug: function() {
		var xbdGame = xbdGames.findOne({ _id: this.gameId });
		if (xbdGame && xbdGame.slug) {
			return xbdGame.slug;
		}
		return;
	},
	achievementImage: function () {
		var image = "/img/achievement-default.jpg";
		if (this.mediaAssets) {
			image = "https://res.cloudinary.com/xbdash/image/fetch/c_fill,h_64,w_64/" + encodeURIComponent(this.mediaAssets);
		}
		return image;
	},
	imageClass: function () {
		var xbdGame = xbdGames.findOne({ _id: this.gameId });
		var imgClass = "img-full";
		if (xbdGame.platform === 'Xenon') {
			imgClass = "img-X";
		}
		return imgClass;
	},
	achievementClass: function () {
		var userPercentage = this.userPercentage;
		var achievementClass = "xbd";
		if (userPercentage >= 0 && userPercentage <= 10) {
			achievementClass = "legendary";
		}
		return achievementClass;
	},
	trophyClass: function () {
		var userPercentage = this.userPercentage;
		var trophyClass = "xbd";
		if (userPercentage >= 0 && userPercentage <= 10) {
			trophyClass = "trophy";
		}
		return trophyClass;
	}
});