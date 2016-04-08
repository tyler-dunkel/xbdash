Template.shareIt.helpers({
	xbdData: function() {
		var content = this.content;
		var author = this.author;
		console.log(author);
		var getImage = $('div > img')[0].src;

		if (getImage) {
			getImage = "https://res.cloudinary.com/xbdash/image/fetch/" + encodeURIComponent(selectFirstImage);
		} else {
			getImage = '/img/news-default.jpg';
		}

		return {
			title: this.title,
			author: 'XBdash',
			image: function () {
				return getImage;
			}
		}
	}
});