Template.newsSinglePage.helpers({
	article: function() {
		var slug = Router.current().params.slug;
		return xbdNews.findOne({ slug: slug });
	},
	published: function () {
		return moment(this.published).format('MMMM Do YYYY, h:mm a');
	},
	shareData: function () {
		var image = this.content.match(/<img[^>]*>/);
		var getImage = '/img/news-default.jpg';

		if (image) {
            getImage = image[0].match(/src="(.+?)"/)[1];
            getImage = "https://res.cloudinary.com/xbdash/image/fetch/" + encodeURIComponent(getImage);
        }

	    return {
	    	title: this.title,
	    	author: this.author,
	    	image: function () {
		        return getImage;
	    	}
	    }
	}
});