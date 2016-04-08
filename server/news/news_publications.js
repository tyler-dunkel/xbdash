Meteor.publish('latestNews', function(limit) {
	var defaultLimit = 9;
	var twoWeeks = moment().subtract(14, 'days').toDate();

	if (limit > defaultLimit) {
		limit = 0;
	}

	return xbdNews.find({}, {
		sort: { updated: -1 },
		fields: {
			updated: 1,
			title: 1,
			source: 1,
			content: 1,
			author: 1,
			slug: 1,
			shareCount: 1
		},
		limit: limit
	});
});

Meteor.publish('mostSharedNews', function(limit) {
	var twoWeeks = moment().subtract(14, 'days').toDate();

	return xbdNews.find({ updated: { $gte: twoWeeks } }, {
		sort: { shareCount: -1 },
		fields: {
			updated: 1,
			title: 1,
			source: 1,
			content: 1,
			slug: 1,
			shareCount: 1
		},
		limit: limit
	});
});

Meteor.publish('singleNews', function(slug) {
	return xbdNews.find({ slug: slug }, {
		fields: {
			updated: 1,
			title: 1,
			source: 1,
			content: 1,
			link: 1,
			author: 1,
			slug: 1,
			contentType: 1,
			shareCount: 1
		}
	});
});