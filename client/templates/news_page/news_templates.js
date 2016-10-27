Template.mostSharedNews.created = function() {
	var limit = this.data.limit;
	this.subscribe('mostSharedNews', limit);
}

Template.mostSharedNews.helpers({
	sharedNews: function(limit) {
		limit = parseInt(limit);
		var twoWeeks = moment().subtract(14, 'days').toDate();
		var article = mostSharedNews.find({ updated: { $gte: twoWeeks } }, { $sort: { shareCount: -1 }, limit: limit }).fetch();
		return article;
	}
});

Template.newsTemplate.rendered = function() {
	$('.post-image-box .img-full').error(function() {
		$(this).attr('src', '/img/news-default.jpg');
	});
}

Template.newsTemplate.helpers({
	getImage: function () {
		var image = this.content.match(/<img[^>]*>/);

		if (image) {
			if (this.source === 'xbdash') {
				return image[0].match(/src="(.+?)"/)[1];
			} else {
				getImage = image[0].match(/src="(.+?)"/)[1];
				getImage = "https://res.cloudinary.com/xbdash/image/fetch/" + encodeURIComponent(getImage);
			}
		} else {
			getImage = '/img/news-default.jpg';
		}

		return getImage;
	},
	sourceExists: function () {
		if (this.source) {
			return true;
		}
		return false;
	},
	sourceName: function () {
		if (this.source) {
			return 'from ' + this.source.toUpperCase();
		}
		return;
	},
	shareCounted: function () {
		if (this.shareCount) {
			return true;
		}
		return false;
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

Template.mostSharedNewsSidebar.created = function() {
	var limit = this.data.limit;
	this.subscribe('mostSharedNews', limit);
}

Template.mostSharedNewsSidebar.helpers({
	sharedNews: function(limit) {
		limit = parseInt(limit);
		var twoWeeks = moment().subtract(14, 'days').toDate();
		var article = mostSharedNews.find({ updated: { $gte: twoWeeks }, source: "polygon" }, { $sort: { shareCount: -1 }, limit: limit }).fetch();
		return article;
	}
});

Template.newsTemplateSidebar.helpers({
	sourceExists: function () {
		if (this.source) {
			return true;
		}
		return false;
	},
	sourceName: function () {
		if (this.source) {
			return 'from ' + this.source.toUpperCase();
		}
		return;
	},
	shareCounted: function () {
		if (this.shareCount) {
			return true;
		}
		return false;
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