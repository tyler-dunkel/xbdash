Template.newsSinglePage.created = function() {
	if (Template.instance().subscriptionsReady()) {
		DocHead.removeDocHeadAddedTags();

		var slug = Router.current().params.slug;
		var article = xbdNews.findOne({ slug: slug });
		var articleDescription = $(article.content).text();
		articleDescription = articleDescription.substr(0,70) + '...';
		var image = article.content.match(/<img[^>]*>/);
		var articleUrl = window.location.href + '/' + slug;
		
		if (image) {
			if (article.source === 'xbdash') {
				getImage = image[0].match(/src="(.+?)"/)[1];
				getImage = 'https://www.xbdash.com' + getImage;
			} else {
				getImage = image[0].match(/src="(.+?)"/)[1];
				getImage = "https://res.cloudinary.com/xbdash/image/fetch/" + encodeURIComponent(getImage);
			}
		} else {
			getImage = 'https://www.xbdash.com/img/news-default.jpg';
		}

		var newsSinglePageMeta = [
			{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
			{ "charset": "utf-8" },
			{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
			{ "name": "description", "content": articleDescription },
			{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
			{ "property": "og:description", "content": articleDescription },
			{ "property": "og:image", "content": getImage },
			{ "property": "og:locale", "content": "en_US" },
			{ "property": "og:site_name", "content": "XBdash" },
			{ "property": "og:title", "content": article.title + " | XBdash" },
			{ "property": "og:type", "content": "article" },
			{ "property": "og:url", "content": articleUrl },
			{ "property": "og:updated_time", "content": article.updated.toISOString() },
			{ "name": "twitter:card", "content": "summary_large_image" },
			{ "name": "twitter:url", "content": articleUrl },
			{ "name": "twitter:title", "content": article.title + " | XBdash" },
			{ "name": "twitter:description", "content": articleDescription },
			{ "name": "twitter:image:src", "content": getImage },
			{ "name": "twitter:site", "content": "@xboxdash" },
			{ "name": "article:published_time", "content": article.updated.toISOString() },
			{ "name": "article:author", "content": article.author }
		];

		var linkInfo = [
			{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
			{ "rel": "canonical", "href": articleUrl },
			{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
			{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
			{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
			{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
		];

		DocHead.setTitle(article.title + " | XBdash");

		for(var i = 0; i < newsSinglePageMeta.length; i++) {
			DocHead.addMeta(newsSinglePageMeta[i]);;
		}

		for(var i = 0; i < linkInfo.length; i++) {
			DocHead.addLink(linkInfo[i]);;
		}
	}
}

Template.newsSinglePage.helpers({
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
	getUrl: function () {
		var slug = Router.current().params.slug;
		return window.location.href + '/' + slug;
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
				getImage = 'https://www.xbdash.com' + encodeURIComponent(getImage);
			} else {
				getImage = image[0].match(/src="(.+?)"/)[1];
				getImage = "https://res.cloudinary.com/xbdash/image/fetch/" + encodeURIComponent(getImage);
			}
		} else {
			getImage = '/img/news-default.jpg';
		}

		return getImage;
	}
});

Template.newsSinglePage.rendered = function() {
	var user = Meteor.user();
	if (!user) {
		setTimeout(function() {
			sweetAlert({
				title: 'Get Your Free Account',
				html: 'Sign up and confirm your Gamertag to unlock your <em>personal</em> dashboard!',
				customClass: 'sign-up-modal',
				allowOutsideClick: false,
				showCancelButton: true,
				confirmButtonText: 'Sign Up for Free',
				cancelButtonText: 'Not Right Now',
				confirmButtonColor: '#138013',
				confirmButtonClass: 'btn-success',
				width: 600
			}, function() {
				Router.go('signUp');
			});
		}, 300000);
	}
}