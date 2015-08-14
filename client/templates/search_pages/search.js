var overlayShow = new ReactiveVar();

var overlay = {
	show: function() {
		overlayShow.set('show');
	},
	hide: function() {
		overlayShow.set('hide');
	}
}

Template.searchBar.rendered = function() {
}

Template.searchBar.events({
	"click .navbar-search .form-control": function (e) {
		console.log("clicked search bar");
		overlay.show();
		$('body').addClass('noscroll');
	}
});

Template.searchOverlayApp.rendered = function() {
	$(".search-input").focus();
	// $(".search-input").attr("placeholder", "&#xF002; search");
}

Template.searchOverlayApp.helpers({
	searchIndexes: function() {
		return ['xbdgames', 'xbdachievements', 'xbdnews'];
	},
});

Template.searchOverlay.events({
	"keyup input": function(e) {
        if (e.keyCode === 27) {
            overlay.hide();
			$('body').removeClass('noscroll');
        }
    },
	"click .search-overlay a": function(e) {
		console.log("clicked close");
		overlay.hide();
		$('body').removeClass('noscroll');
	}
});

Template.searchOverlay.helpers({
	overlayVisible: function() {
		console.log("search overlay firing");
		if (overlayShow.get() === 'show') {
			return true;
		}
	}
});

Template.singleGameSearch.created = function() {
	this.subscribe('gameDetails', this.data._id);
}

Template.singleGameSearch.helpers({
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
        var image = "/img/xbdash_greenicon.png";
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

Template.singleNewsSearch.helpers({
	getImage: function () {
        var image = this.content.match(/<img[^>]*>/);
        if (image) {
            var getImage = image[0].match(/src="(.+?)"/)[1];
        }
        return getImage;
	},
	updatedDate: function() {
		return moment(this.updated).format('MMMM Do YYYY, h:mm:ss a');
	},
	shareCount: function() {
		if (this.shareCount) {
			var shareCount = numberFormatter(this.shareCount);
			if (this.shareCount === 1) {
				return shareCount + ' share';
			} else {
				return shareCount + ' shares';
			}
		}
		return '0 shares';
	}
});

Tracker.autorun(function() {
});