Template.achievementsSinglePage.created = function() {
	var slug = Router.current().params.slug;
	console.log(slug);
	Meteor.subscribe('singleAchievement', slug);
}

Template.achievementsSinglePage.helpers({
	achievement: function () {
		var slug = Router.current().params.slug;
		return xbdAchievements.findOne({ slug: slug });
	},
	gameName: function() {
        var xbdGame = xbdGames.findOne({ _id: this.gameId });
        return xbdGame.name;
    },
    ifXenon: function () {
        var game = xbdGames.findOne({ _id: this.gameId });
        if (game.platform === 'Durango') {
            return 'img-x360';
        }
        //return;
    },
    achievementImage: function () {
        var image = "/img/xboxdash_greenicon.png";
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