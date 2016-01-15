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
	updatedDate: function() {
		return moment(this.updated).format('MMMM Do YYYY, h:mm a');
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