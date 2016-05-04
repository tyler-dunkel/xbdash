Meteor.publish('xbdashNews', function(limit) {
	var defaultLimit = 9;
	var twoWeeks = moment().subtract(14, 'days').toDate();

	if (limit < defaultLimit) {
		limit = 9;
	}

	return xbdNews.find({
		source: "xbdash"
	}, {
		sort: { updated: -1 },
		fields: {
			updated: 1,
			title: 1,
			source: 1,
			content: 1,
			author: 1,
			slug: 1
		},
		limit: limit
	});
});

Meteor.publish('polygonNews', function(limit) {
	var defaultLimit = 9;
	var twoWeeks = moment().subtract(14, 'days').toDate();

	if (limit < defaultLimit) {
		limit = 9;
	}

	return xbdNews.find({
		source: "polygon"
	}, {
		sort: { updated: -1 },
		fields: {
			updated: 1,
			title: 1,
			source: 1,
			content: 1,
			author: 1,
			slug: 1
		},
		limit: limit
	});
});

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
			slug: 1
		},
		limit: limit
	});
});

Meteor.publish('mostSharedNews', function(limit) {
	var twoWeeks = moment().subtract(14, 'days').toDate();

	var sharedNews = xbdNews.find({ updated: { $gte: twoWeeks } }, {
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

	self = this;

	sharedNews.forEach(function(article) {
		self.added('most_shared_news', article._id, {
			updated: article.updated,
			title: article.title,
			source: article.source,
			content: article.content,
			slug: article.slug,
			shareCount: article.shareCount
		});
	});
	self.ready();
});

Meteor.publish('singleNews', function(slug) {
	return xbdNews.find({ slug: slug }, {
		fields: {
			updated: 1,
			title: 1,
			source: 1,
			content: 1,
			author: 1,
			slug: 1
		}
	});
});