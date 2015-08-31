Template.achievementsSinglePage.created = function() {
}

Template.achievementsSinglePage.helpers({
	achievement: function () {
		var slug = Router.current().params.slug;
		return xbdAchievements.findOne({ slug: slug });
	},
	game: function() {
        return xbdGames.findOne({ _id: this.gameId });
    },
    ifXenon: function () {
        var gameD = xbdGames.findOne({ _id: this.gameId });
        if (gameD.platform === 'Durango') {
            return 'img-x360';
        }
        //return;
    },
    achievementImage: function () {
        var image = "/img/achievement-default.jpg";
        if (this.mediaAssets) {
            image = this.mediaAssets;
        }
        return image;
    }
});

Template.achievementsSinglePage.events({
});

Tracker.autorun(function() {
});