Meteor.publish('latestNews', function(limit) {
	var defaultLimit = 9;
	var twoWeeks = moment().subtract(14, 'days').toDate();
	if (limit > defaultLimit) {
		limit = 0;
	}
	var latestNews = xbdNews.find({}, {
		sort: { updated: -1 },
		fields: {
			updated: 1,
			title: 1,
			content: 1,
			slug: 1,
			author: 1,
			shareCount: 1
		},
		limit: limit
	});
	return latestNews;
});

Meteor.publish('mostSharedNews', function(limit) {
	var twoWeeks = moment().subtract(14, 'days').toDate();
	var mostSharedNews = xbdNews.find({ updated: { $gte: twoWeeks } }, {
		sort: { shareCount: -1 },
		fields: {
			updated: 1,
			title: 1,
			content: 1,
			slug: 1,
			shareCount: 1
		},
		limit: limit
	});
	return mostSharedNews;
});

Meteor.publish('singleNews', function(slug) {
	return xbdNews.find({ slug: slug });
});