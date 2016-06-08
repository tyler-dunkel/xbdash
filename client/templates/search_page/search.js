var overlayShow = new ReactiveVar();

var overlay = {
	show: function() {
		overlayShow.set('show');
	},
	hide: function() {
		overlayShow.set('hide');
	}
}

Template.searchBar.events({
	"click .navbar-search .form-control": function (e) {
		overlay.show();
		$('body').addClass('noscroll');
	}
});

Template.searchBarMobile.events({
	"click .mobile-search .form-control": function (e) {
		overlay.show();
		$('body').addClass('noscroll');
	}
});

Template.searchOverlayApp.rendered = function() {
	$(".search-input").focus();
}

Template.searchOverlayApp.helpers({
	searchIndexes: function() {
		return ['xbdgames', 'xbdachievements', 'xbdnews'];
	}
});

Template.searchOverlay.helpers({
	overlayVisible: function() {
		if (overlayShow.get() === 'show') {
			return true;
		}
	}
});

Template.searchOverlay.events({
	"keyup input": function(e) {
        if (e.keyCode === 27) {
            overlay.hide();
			$('body').removeClass('noscroll');
        }
    },
	"click .search-overlay a": function(e) {
		overlay.hide();
		$('body').removeClass('noscroll');
	}
});

Template.singleGameSearch.created = function() {
	this.subscribe('gameDetailsSearch', this.data._id);
}

Template.singleGameSearch.helpers({
    gamePublisherName: function () {
        var getPublisherName = gameDetails.findOne({ gameId: this._id });
        return getPublisherName.gamePublisherName;
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
        var image = '/img/game-default.jpg';
        if (gameDetail) {
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
	    }
        return image;
    }
});

Template.singleAchievementSearch.helpers({
	getAchievementImage: function () {
		var image = "/img/achievement-default.jpg";
        if (this.mediaAssets) {
            image = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_30,h_30/" + encodeURIComponent(this.mediaAssets);
        }
        return image;
	}
});

Template.singleNewsSearch.helpers({
	getNewsImage: function () {
        var image = this.content.match(/<img[^>]*>/);

        if (image) {
			if (this.source === 'xbdash') {
				getImage = image[0].match(/src="(.+?)"/)[1];
				getImage = encodeURIComponent(getImage);
			} else {
				getImage = image[0].match(/src="(.+?)"/)[1];
				getImage = "https://res.cloudinary.com/xbdash/image/fetch/c_fit,w_90,h_90/" + encodeURIComponent(getImage);
			}
		} else {
			getImage = '/img/news-default.jpg';
		}
		
        return getImage;
	},
	updatedDate: function() {
		return moment(this.updated).format('MMMM Do YYYY, h:mm:ss a');
	},
	shareCount: function() {
		if (this.shareCount) {
			var shareCount = shareFormatter(this.shareCount);
			if (this.shareCount === 1) {
				return shareCount + ' share';
			} else {
				return shareCount + ' shares';
			}
		}
		return '0 shares';
	}
});