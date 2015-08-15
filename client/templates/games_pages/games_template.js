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
}

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
        console.log(this);
        //var xbdGame = xbdGames.findOne({ _id: this.gameId });
        var gameDetail = gameDetails.findOne({ gameId: this._id });
        var image = "/img/game-default.jpg";
        if (this.platform === 'Xenon') {
            gameDetail.gameArt.forEach(function(art) {
                if (art.Purpose === 'BoxArt' && art.Width === 219) {
                    image =  art.Url;
                }
            });
        }
        if (this.platform === 'Durango') {
            gameDetail.gameArt.forEach(function(art) {
                if (art.Purpose === 'BrandedKeyArt' && art.Width === 584) {
                    image =  art.Url;
                }
            });
        }
        return image;
    }
});

Template.gameRating.helpers({
    gameAllTimeAverageRating: function () {
        var gameDetail = gameDetails.findOne({ gameId: this._id });
        return gameDetail.gameAllTimeAverageRating;
    }
});