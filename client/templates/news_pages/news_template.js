Template.newsTemplate.rendered = function() {
    $('.post-image-box .img-full').error(function() {
        $(this).attr('src', '/img/news-default.jpg');
    });
}

Template.newsTemplate.helpers({
	getImage: function () {
        var image = this.content.match(/<img[^>]*>/);
        var getImage = '/img/news-default.jpg';
        if (image) {
            getImage = image[0].match(/src="(.+?)"/)[1];
            getImage = "https://res.cloudinary.com/xbdash/image/fetch/" + encodeURIComponent(getImage);
        }
        return getImage;
	},
	sourceExists: function () {
		if (this.source !== 'xboxdash') {
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