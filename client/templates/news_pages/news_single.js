Template.newsSinglePage.helpers({
	article: function() {
		var slug = Router.current().params.slug;
		return xbdNews.findOne({ slug: slug });
	},
	sourceExists: function () {
		if (this.source !== 'xboxdash') {
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
	published: function () {
		return moment(this.published).format('MMMM Do YYYY, h:mm a');
	},
	newsData: function () {
		var image = this.content.match(/<img[^>]*>/);
		var getImage = image[0].match(/src="(.+?)"/)[1];

		if (getImage) {
			getImage = "https://res.cloudinary.com/xbdash/image/fetch/" + encodeURIComponent(getImage);
		} else {
			getImage = '/img/news-default.jpg';
		}

		return {
			title: this.title,
			description: this.content,
			image: function () {
				return getImage;
			},
			author: 'xboxdash'
		}
	}
});