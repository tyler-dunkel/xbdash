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