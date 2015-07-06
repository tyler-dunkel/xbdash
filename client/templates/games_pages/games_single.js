Template.gamesSinglePage.created = function() {
	var slug = Router.current().params.slug;
	Meteor.subscribe('singleGame', slug);
}

Template.gamesSinglePage.helpers({
	game: function () {
		var slug = Router.current().params.slug;
		var game = xbdGames.findOne({ slug: slug });
		return gameDetails.findOne({ gameId: game._id });
	},
	gamesImage: function () {
        //var xbdGame = xbdGames.findOne({ _id: this.gameId });
        var game = xbdGames.findOne({ _id: this.gameId });
        var image = "/img/xboxdash_greenicon.png";
        if (game.platform === 'Xenon') {
            this.gameArt.forEach(function(art) {
                if (art.Purpose === 'BoxArt' && art.Width === 219) {
                    image =  art.Url;
                }
            });
        }
        if (game.platform === 'Durango') {
            this.gameArt.forEach(function(art) {
                if (art.Purpose === 'BrandedKeyArt' && art.Width === 584) {
                    image =  art.Url;
                }
            });
        }
        return image;
    },
    dateFormat: function () {
        return moment(this.gameReleaseDate).format('l');
    },
    gamePlatform: function () {
    	var game = xbdGames.findOne({ _id: this.gameId });
    	return game.platform;
    },
    achievementsList: function () {
        return xbdAchievements.find({ gameId: this.gameId }, { sort: { value: 1, userPercentage: -1 }, limit: 100 });
    },
    achievementImage: function () {
        var xbdGame = xbdGames.findOne({ _id: this.gameId });
        var gameDetail = gameDetails.findOne({ gameId: this.gameId });
        var image = "/img/xboxdash_greenicon.png";
        if (xbdGame.platform === 'Xenon') {
            gameDetail.gameArt.forEach(function(art) {
                if (art.Purpose === 'BoxArt') {
                    image =  art.Url;
                }
            });
        }
        if (xbdGame.platform === 'Durango') {
            gameDetail.gameArt.forEach(function(art) {
                if (art.Purpose === 'BrandedKeyArt') {
                    image =  art.Url;
                }
            });
        }
        return image;
    }
});

Template.gamesSinglePage.events({
});

Template.gameRatingSingle.rendered = function() {
    $('.game-rating').raty({
        readOnly: true,
        numberMax : 5,
        path: '/img',
        score: function() {
            return $(this).attr('data-score');
        },
        starHalf: 'star-half.png',
        starOff: 'star-off.png',
        starOn: 'star-on.png'
    });
}

Tracker.autorun(function() {
});