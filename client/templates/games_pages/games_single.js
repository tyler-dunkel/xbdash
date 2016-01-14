var achievementShowNext = new ReactiveVar(0);

Template.gamesSinglePage.created = function() {
    var slug = Router.current().params.slug;
    this.subscribe('singleGame', slug);
}

Template.gamesSinglePage.helpers({
    game: function () {
        if (Template.instance().subscriptionsReady()) {
            var slug = Router.current().params.slug;
            var game = xbdGames.findOne({ slug: slug });
            if (game && game._id) {
                return gameDetails.findOne({ gameId: game._id });
            }
        }
    },
    gamesImage: function () {
        var game = xbdGames.findOne({ _id: this.gameId });
        var image = "/img/game-default.jpg";
        if (game.platform === 'Xenon') {
            this.gameArt.forEach(function(art) {
                if (art.Purpose === 'BoxArt' && art.Width === 219) {
                    image = "https://res.cloudinary.com/xbdash/image/fetch/" + encodeURIComponent(art.Url);
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
    chkUserForGame: function () {
        var userId = Meteor.userId();
        var userGame = userGames.find({ gameId: this.gameId, userId: userId });
        if (userGame && userGame.count() > 0) return true;
        return false; 
    }
});

Template.userGamerscoreInfo.created = function() {
    var slug = Router.current().params.slug;
    this.subscribe('singleGame', slug);
}

Template.userGamerscoreInfo.helpers({
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

Template.gamerscoreInfo.created = function() {
    var slug = Router.current().params.slug;
    this.subscribe('singleGame', slug);
}

Template.gamerscoreInfo.helpers({
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
    this.achievementShowNext = new ReactiveVar(0);
}

Template.gamesSinglePageAchievement.rendered = function() {
    $('[data-toggle="tooltip"]').tooltip();
}

Template.gamesSinglePageAchievement.helpers({
    achievementsList: function () {
        var user = Meteor.user();
        return xbdAchievements.find({ gameId: this.gameId }, {
            sort: {
                value: 1,
                name: 1
            },
            limit: 7,
            skip: Template.instance().achievementShowNext.get()
        });
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
    }
});

Template.gamesSinglePageAchievement.events({
    "click .achievement-next": function(event) {
        var button = $(event.currentTarget);
        if (button.hasClass('disabled')) {
            return;
        }
        var currentCount = Template.instance().achievementShowNext.get();
        Template.instance().achievementShowNext.set(currentCount + 7);
    },
    "click .achievement-previous": function(event) {
        var button = $(event.currentTarget);
        if (button.hasClass('disabled')) {
            return;
        }
        var currentCount = Template.instance().achievementShowNext.get();
        Template.instance().achievementShowNext.set(currentCount - 7);
    }
});