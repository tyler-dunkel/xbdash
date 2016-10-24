Template.newsSinglePage.created = function() {
	DocHead.removeDocHeadAddedTags();

	var self = this;
	var slug = Router.current().params.slug;

	this.subscribe('singleNews', slug);
}

Template.newsSinglePage.helpers({
	type1: function() {
		var slug = Router.current().params.slug;
		var news = xbdNews.findOne({ slug: slug });
		if (news.type === 'news' || type === 'spotlight') {
			return true;
		}
	},
	type2: function() {
		var slug = Router.current().params.slug;
		var news = xbdNews.findOne({ slug: slug });
		if (news.type === 'reviews' || type === 'opinion') {
			return true;
		}
	}
});

Template.contentTemplate1.helpers({
	article: function() {
		var slug = Router.current().params.slug;
		return xbdNews.findOne({ slug: slug });
	},
	sourceExists: function () {
		if (this.source !== 'xbdash') {
			return true;
		}
		return false;
	},
	sourceName: function () {
		if (this.source) {
			return 'of ' + this.source.toUpperCase();
		}
		return;
	},
	updated: function () {
		return moment(this.updated).format('MMMM Do YYYY, h:mm a');
	}
});

Template.contentTemplate1.rendered = function() {
	var user = Meteor.user();
	var userLogged = Meteor.loggingIn();
	if (!user && !userLogged) {
		setTimeout(function() {
			sweetAlert({
				title: 'Win a Year of Xbox® Live Gold!',
				html: 'Enter the August Referral Contest!<br />Verified member with the <strong>most referrals</strong> by August 31, 2016 wins! See contest rules.',
				customClass: 'sign-up-modal',
				allowOutsideClick: false,
				showCancelButton: true,
				confirmButtonText: 'Sign Up for Free',
				cancelButtonText: 'Not Right Now',
				confirmButtonColor: '#138013',
				confirmButtonClass: 'btn-success',
				width: 480
			}, function() {
				Router.go('contestPage');
			});
		}, 120000);
	}
}

Template.contentTemplate2.helpers({
	article: function() {
		var slug = Router.current().params.slug;
		return xbdNews.findOne({ slug: slug });
	},
	sourceExists: function () {
		if (this.source !== 'xbdash') {
			return true;
		}
		return false;
	},
	sourceName: function () {
		if (this.source) {
			return 'of ' + this.source.toUpperCase();
		}
		return;
	},
	updated: function () {
		return moment(this.updated).format('MMMM Do YYYY, h:mm a');
	},
	chkGame: function () {
		var slug = Router.current().params.slug;
		var article = xbdNews.findOne({ slug: this.slug });
		if (article.gameId === '') {
			return false;
		}
		return true;
	},
	game: function () {
		var slug = Router.current().params.slug;
		var article = xbdNews.findOne({ slug: slug });
		if (article && article.gameId) {
			return gameDetails.findOne({ gameId: article.gameId });
		}
	}

});

Template.contentTemplate2.rendered = function() {
	var user = Meteor.user();
	var userLogged = Meteor.loggingIn();
	if (!user && !userLogged) {
		setTimeout(function() {
			sweetAlert({
				title: 'Win a Year of Xbox® Live Gold!',
				html: 'Enter the August Referral Contest!<br />Verified member with the <strong>most referrals</strong> by August 31, 2016 wins! See contest rules.',
				customClass: 'sign-up-modal',
				allowOutsideClick: false,
				showCancelButton: true,
				confirmButtonText: 'Sign Up for Free',
				cancelButtonText: 'Not Right Now',
				confirmButtonColor: '#138013',
				confirmButtonClass: 'btn-success',
				width: 480
			}, function() {
				Router.go('contestPage');
			});
		}, 120000);
	}
}

Template.newsSinglePageDocHead.created = function() {
	var newsSinglePageDescription = $(this.data.content).text();
	newsSinglePageDescription = newsSinglePageDescription.substr(0,152) + '...';
	var image = this.data.content.match(/<img[^>]*>/);
	
	if (image) {
		if (this.data.source === 'xbdash') {
			newsSinglePageImage = image[0].match(/src="(.+?)"/)[1];
			newsSinglePageImage = 'https://www.xbdash.com' + newsSinglePageImage;
		} else {
			newsSinglePageImage = image[0].match(/src="(.+?)"/)[1];
			newsSinglePageImage = "https://res.cloudinary.com/xbdash/image/fetch/" + encodeURIComponent(newsSinglePageImage);
		}
	} else {
		newsSinglePageImage = 'https://www.xbdash.com/img/news-default.jpg';
	}

	var newsSinglePageTitle = this.data.title + " | XBdash";
	var newsSinglePageUrl = window.location.href;
	var newsSinglePageUpdatedTime = this.data.updated.toISOString();
	var newSinglePageAuthor;
	
	if (this.data.source === 'xbdash') {
		newsSinglePageAuthor = this.data.author;
	} else {
		newsSinglePageAuthor = this.data.author + ' of POLYGON';
	}

	var newsSinglePageDocHeadMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": newsSinglePageDescription },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": newsSinglePageDescription },
		{ "property": "og:image", "content": newsSinglePageImage },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": newsSinglePageTitle },
		{ "property": "og:type", "content": "article" },
		{ "property": "og:url", "content": newsSinglePageUrl },
		{ "property": "og:updated_time", "content": newsSinglePageUpdatedTime },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:url", "content": newsSinglePageUrl },
		{ "name": "twitter:title", "content": newsSinglePageTitle },
		{ "name": "twitter:description", "content": newsSinglePageDescription },
		{ "name": "twitter:image:src", "content": newsSinglePageImage },
		{ "name": "twitter:site", "content": "@xboxdash" },
		{ "name": "article:published_time", "content": newsSinglePageUpdatedTime },
		{ "name": "article:author", "content": newsSinglePageAuthor }
	];

	var linkInfo = [
		{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": newsSinglePageUrl },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
	];

	DocHead.setTitle(newsSinglePageTitle);

	for(var i = 0; i < newsSinglePageDocHeadMeta.length; i++) {
		DocHead.addMeta(newsSinglePageDocHeadMeta[i]);;
	}

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}
}

Template.newsGameInfoColumn.helpers({
	gamesImage: function () {
		var game = xbdGames.findOne({ _id: this.gameId });
		var image = "https://www.xbdash.com/img/game-default.jpg";

		if (game.platform === 'Xenon') {
			this.gameArt.forEach(function(art) {
				if (art.Purpose === 'BoxArt' && art.Width === 219) {
					image = "https://res.cloudinary.com/xbdash/image/fetch/h_628,c_scale/" + encodeURIComponent(art.Url);
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
	gamePublisher: function () {
		var game = gameDetails.findOne({ gameId: this.gameId });
		return game.gamePublisherName;
	},
	gameDeveloper: function () {
		var game = gameDetails.findOne({ gameId: this.gameId });
		return game.gameDeveloperName;
	},
	dateFormat: function () {
		return moment(this.gameReleaseDate).format('l');
	}
});

Template.newsSinglePageShareButtons.helpers({
	getUrl: function () {
		var slug = Router.current().params.slug;
		return window.location.href;
	},
	getShortDescription: function () {
		var articleDescription = $(this.content).text();
		return articleDescription.substr(0,70) + '...';
	},
	getShareImage: function () {
		var image = this.content.match(/<img[^>]*>/);

		if (image) {
			if (this.source === 'xbdash') {
				getImage = image[0].match(/src="(.+?)"/)[1];
				getImage = encodeURIComponent(getImage);
			} else {
				getImage = image[0].match(/src="(.+?)"/)[1];
				getImage = "https://res.cloudinary.com/xbdash/image/fetch/" + encodeURIComponent(getImage);
			}
		} else {
			getImage = 'https://www.xbdash.com/img/news-default.jpg';
		}

		return getImage;
	}
});