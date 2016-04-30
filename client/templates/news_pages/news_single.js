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
	newsData: function () {
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

		var getSource = this.source.toUpperCase();
		
		return {
			title: this.title,
			description: 'Source: ' + getSource + ' | Read the latest news on XBdash.com.',
			image: function () {
				return getImage;
			},
			author: 'xboxdash'
		}
	}
});