var achievementShowNext = new ReactiveVar(0);

Template.gamesSinglePage.created = function() {
    // var self = this;
    this.subscribe('gameDetails');
}

Template.gamesSinglePage.rendered = function() {
}

Template.gamesSinglePage.helpers({
	game: function () {
        if (Template.instance().subscriptionsReady()) {
    		var slug = Router.current().params.slug;
    		var game = xbdGames.findOne({ slug: slug });

            if (game && game._id) {
                return gameDetails.findOne({ gameId: game._id }, {
                    fields: {
                        gameId: 1,
                        gameName: 1,
                        gameDescription: 1,
                        gameReleaseDate: 1,
                        gameGenre: 1,
                        gameArt: 1,
                        gamePublisherName: 1,
                        gameAllTimeAverageRating: 1
                    }
                });
            }
        }
	},
	gamesImage: function () {
        var game = xbdGames.findOne({ _id: this.gameId });
        var image = "/img/game-default.jpg";

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
    	var game = xbdGames.findOne({ _id: this.gameId }, { fields: { platform: 1 } });
        if (game.platform == 'Durango') {
            return 'Xbox One';
        }
        if (game.platform == 'Xenon') {
            return 'Xbox 360';
        }
    	return 'Xbox';
    }
});

Template.gamerscoreInfo.created = function() {
    var slug = Router.current().params.slug;
    this.subscribe('singleGameAchievements', slug);
}

Template.gamerscoreInfo.helpers({
    chkCompleted: function () {
        var user = Meteor.user();
        if (user && user.gamertagScanned) {
            var game = userGames.findOne({ gameId: this.gameId });
            if (game && game.completed) {
                return true;
            }
            return false;
        }
        return false;
    },
    userCurrentGamerscore: function () {
        var game = userGames.findOne({ gameId: this.gameId }, { fields: { currentGamerscore: 1 } });
        if (game && game.currentGamerscore) {
            return game.currentGamerscore;
        }
    },
    userCurrentAchievements: function () {
        var game = userGames.findOne({ gameId: this.gameId });
        if (game && game.earnedAchievements) {
            return game.earnedAchievements;
        }
    },
    gameMaxGamerscore: function () {
        var game = xbdGames.findOne({ _id: this.gameId }, { fields: { maxGamerscore: 1 } });
        if (game && game.maxGamerscore) {
            return game.maxGamerscore;
        }
    },
    gameMaxAchievements: function() {
        return xbdAchievements.find({ gameId: this.gameId }).count();
    }
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

Template.gamesSinglePageAchievement.created = function() {
    var slug = Router.current().params.slug;
    this.subscribe('singleGameAchievements', slug);
}

Template.gamesSinglePageAchievement.helpers({
    achievementsList: function () {
        var skip = achievementShowNext.get();
        return xbdAchievements.find({ gameId: this.gameId }, {
            sort: {
                userPercentage: 1,
                name: 1,
            },
            fields: {
                gameId: 1,
                name: 1,
                mediaAssets: 1,
                description: 1,
                value: 1,
                slug: 1,
                userPercentage: 1
            },
            limit: 7,
            skip: skip
        });
    },
    chkProgress: function () {
        var user = Meteor.user();
        if (user && user.gamertagScanned) {
            var userAchievement = userAchievements.findOne({ achievementId: this._id });
            if (userAchievement && userAchievement.progressState) {
                return true;
            }
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
        var xbdGame = xbdGames.findOne({ _id: this.gameId });
        var gameDetail = gameDetails.findOne({ gameId: this.gameId });
        var image = "/img/achievement-default.jpg";

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

Template.gamesSinglePageAchievement.events({
	"click .achievement-next": function(event) {
		var button = $(event.currentTarget);
		if (button.hasClass('disabled')) {
			return;
		}
		var currentCount = achievementShowNext.get();

		achievementShowNext.set(currentCount + 7);
		console.log(achievementShowNext.get());
	},
    "click .achievement-previous": function(event) {
        var button = $(event.currentTarget);
        if (button.hasClass('disabled')) {
            return;
        }
        var currentCount = achievementShowNext.get();

        achievementShowNext.set(currentCount - 7);
        console.log(achievementShowNext.get());
    }
});