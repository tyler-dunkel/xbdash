var achievementShowNext = new ReactiveVar(0);
Template.gamesSinglePage.created = function() {
    this.subscribe('gameDetails');
}

Template.gamesSinglePage.rendered = function() {
	var slug = Router.current().params.slug;
	var game = xbdGames.findOne({slug: slug});
	this.autorun(function() {
    	var achievementCount = xbdAchievements.find({ gameId: game._id }).count();
    	var currentCount = achievementShowNext.get();
    	var check = Template.instance().subscriptionsReady();
    	if (achievementCount <= currentCount && check) {
    		console.log("one is greater");
    		$('.achievement-next').addClass('disabled');
    		return;
    	}
    	$('.achievement-next').removeClass('disabled');
	});
}

Template.gamesSinglePage.helpers({
	game: function () {
		var slug = Router.current().params.slug;
		var game = xbdGames.findOne({ slug: slug });
        return gameDetails.findOne({ gameId: game._id });
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
    	var game = xbdGames.findOne({ _id: this.gameId });
    	return game.platform;
    },
    chkPlatform: function () {
        var game = xbdGames.findOne({ _id: this.gameId });
        if (game.platform === 'Xenon') {
            return 'thumb-md2';
        }
        return;
    },
    achievementsList: function () {
    	var skip = achievementShowNext.get();
        return xbdAchievements.find({ gameId: this.gameId }, { sort: { value: 1, userPercentage: -1 }, limit: 7, skip: skip });
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

Template.gamesSinglePage.events({
	"click .achievement-next": function(event) {
		var button = $(event.currentTarget);
		if (button.hasClass('disabled')) {
			return;
		}
		var currentCount = achievementShowNext.get();
		achievementShowNext.set(currentCount + 5);
		console.log(achievementShowNext.get());
	},
    "click .achievement-previous": function(event) {
        var button = $(event.currentTarget);
        if (button.hasClass('disabled')) {
            return;
        }
        var currentCount = achievementShowNext.get();
        achievementShowNext.set(currentCount - 5);
        console.log(achievementShowNext.get());
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