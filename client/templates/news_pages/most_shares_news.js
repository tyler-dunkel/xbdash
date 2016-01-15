Template.mostSharedNews.created = function() {
	var limit = this.data.limit;
	this.subscribe('mostSharedNews', limit);
}

Template.mostSharedNews.helpers({
	sharedNews: function(limit) {
		limit = parseInt(limit);
		var twoWeeks = moment().subtract(14, 'days').toDate();
		var article = xbdNews.find({ updated: { $gte: twoWeeks } }, { $sort: { shareCount: -1 }, fields: { updated: 1, title: 1, content: 1, slug: 1 }, limit: limit }).fetch();
		return article;
	}
});

Template.mostSharedNewsOverlay.created = function() {
	var limit = this.data.limit;
	this.subscribe('mostSharedNews', limit);
}

Template.mostSharedNewsOverlay.helpers({
	sharedNews: function(limit) {
		limit = parseInt(limit);
		var twoWeeks = moment().subtract(14, 'days').toDate();
		var article = xbdNews.find({ updated: { $gte: twoWeeks } }, { $sort: { shareCount: -1 }, fields: { updated: 1, title: 1, content: 1, slug: 1 }, limit: limit }).fetch();
		return article;
	}
});

Template.mostSharedNewsLine.helpers({
	getImage: function () {
        var image = this.content.match(/<img[^>]*>/);
        var getImage = '/img/news-default.jpg';
        if (image) {
            getImage = image[0].match(/src="(.+?)"/)[1];
            getImage = image = "https://res.cloudinary.com/xbdash/image/fetch/" + encodeURIComponent(getImage);
        }
        return getImage;
	},
	updatedDate: function() {
		return moment(this.updated).format('MMMM Do YYYY, h:mm a');
	}
});