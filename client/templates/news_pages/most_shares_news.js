Template.mostSharedNews.created = function() {
	//var limit = this.data.limit;
	//Meteor.subscribe('mostSharedNews', limit);
	Meteor.subscribe('mostSharedNews');
}

Template.mostSharedNews.helpers({
	sharedNews: function() {
		var twoWeeks = moment().subtract(14, 'days').toDate();
		var article = xbdNews.find({ updated: { $gte: twoWeeks } }, { $sort: { shareCount: -1 }, fields: { updated: 1, title: 1, content: 1, id: 1 }, limit: 10 }).fetch();
		/* limit: this.limit */
		return article;
	}
});

Template.mostSharedNewsLine.helpers({
	getImage: function () {
        var image = this.content.match(/<img[^>]*>/);
        if (image) {
            var getImage = image[0].match(/src="(.+?)"/)[1];
        }
        return getImage;
	},
	updatedDate: function() {
		return moment(this.updated).format('MMMM Do YYYY, h:mm a');
	}
});