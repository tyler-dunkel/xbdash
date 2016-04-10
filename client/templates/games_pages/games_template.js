Template.gameRating.rendered = function() {
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
    $('.ih-item.square .img .games-thumb .game-image').error(function() {
        $(this).attr('src', '/img/game-default.jpg');
    });
}

Template.gameRating.helpers({
    gameAllTimeAverageRating: function () {
        var gameDetail = gameDetails.findOne({ gameId: this._id });
        return gameDetail.gameAllTimeAverageRating;
    }
});

Template.singleGame.helpers({
    gamePublisherName: function () {
        var gameDetail = gameDetails.findOne({ gameId: this._id });
        return gameDetail.gamePublisherName;
    },
    dateFormat: function() {
        var gameDetail = gameDetails.findOne({ gameId: this._id });
        return moment(gameDetail.gameReleaseDate).format('l');
    },
    gameGenre: function () {
        var gameDetail = gameDetails.findOne({ gameId: this._id });
        return gameDetail.gameGenre;
    },
    gamesImage: function () {
        var gameDetail = gameDetails.findOne({ gameId: this._id });
        var image = "/img/game-default.jpg";
        if (this.platform === 'Xenon') {
            gameDetail.gameArt.forEach(function(art) {
                if (art.Purpose === 'BoxArt' && art.Width === 219) {
                    image = "https://res.cloudinary.com/xbdash/image/fetch/" + encodeURIComponent(art.Url);
                }
            });
        }
        if (this.platform === 'Durango') {
            gameDetail.gameArt.forEach(function(art) {
                if (art.Purpose === 'BrandedKeyArt' && art.Width === 584) {
                    image = "https://res.cloudinary.com/xbdash/image/fetch/" + encodeURIComponent(art.Url);
                }
            });
        }
        return image;
    }
});