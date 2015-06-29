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

Template.myTopGamesTemplate.helpers({
    dateFormat: function() {
        return moment(this.gameReleaseDate).format('l');
    },
    gamesImage: function () {
        console.log(this);
        var xbdGame = xbdGames.findOne({ _id: this.gameId });
        var gameDetail = gameDetails.findOne({ gameId: this.gameId });
        var image = "/img/xboxdash_greenicon.png";
        if (xbdGame.platform === 'Xenon') {
            gameDetail.gameArt.forEach(function(art) {
                if (art.Purpose === 'BoxArt' && art.Width === 219) {
                    image =  art.Url;
                }
            });
        }
        if (xbdGame.platform === 'Durango') {
            gameDetail.gameArt.forEach(function(art) {
                if (art.Purpose === 'BrandedKeyArt' && art.Width === 584) {
                    image =  art.Url;
                }
            });
        }
        return image;
    }
});
Template.gamesReleaseDateTemplate.helpers({
    dateFormat: function() {
        return moment(this.gameReleaseDate).format('l');
    },
    gamesImage: function () {
        console.log(this);
        var xbdGame = xbdGames.findOne({ _id: this.gameId });
        var gameDetail = gameDetails.findOne({ gameId: this.gameId });
        var image = "/img/xboxdash_greenicon.png";
        if (xbdGame.platform === 'Xenon') {
            gameDetail.gameArt.forEach(function(art) {
                if (art.Purpose === 'BoxArt' && art.Width === 219) {
                    image =  art.Url;
                }
            });
        }
        if (xbdGame.platform === 'Durango') {
            gameDetail.gameArt.forEach(function(art) {
                if (art.Purpose === 'BrandedKeyArt' && art.Width === 584) {
                    image =  art.Url;
                }
            });
        }
        return image;
    },
});