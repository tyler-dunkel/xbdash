Meteor.publish('latestNews', function(limit) {
	var defaultLimit = xbdNews.find().count();
	if (limit > defaultLimit) {
		limit = 0;
	}
	return xbdNews.find({ }, { limit: limit });
});

Meteor.publish('mostSharedNews', function(limit) {
	var twoWeeks = moment().subtract(14, 'days').toDate();
	var trendingNews = xbdNews.find({
		updated: { $gte: twoWeeks } 
	}, {
		$sort: { shareCount: -1 },
		fields: {
			updated: 1,
			title: 1,
			content: 1,
			id: 1
		},
		limit: limit
	});
	return trendingNews;
});

Meteor.publish('singleNews', function(id) {
	return xbdNews.find({ id: id });
});