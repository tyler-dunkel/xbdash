Template.newsTemplate.rendered = function() {
}

Template.newsTemplate.helpers({
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