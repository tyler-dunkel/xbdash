Meteor.publish('latestNews', function(limit) {
	var defaultLimit = 9;
	if (!limit) {
		limit = defaultLimit;
	}

	return xbdNews.find({}, {
		sort: {
			source: -1,
			updated: -1
		},
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

// Meteor.publish('singleNews', function(slug) {
// 	return xbdNews.find({ slug: slug }, {
// 		fields: {
// 			updated: 1,
// 			title: 1,
// 			source: 1,
// 			content: 1,
// 			author: 1,
// 			slug: 1
// 		}
// 	});
// });

Meteor.publishComposite('singleNews', function(slug) {
	return {
		find: function() {
			check(slug, String);
			return xbdNews.find({ slug: slug }, {
				fields: {
					updated: 1,
					title: 1,
					source: 1,
					content: 1,
					author: 1,
					slug: 1,
					type: 1,
					featuredImage: 1,
					gameId: 1
				}
			});
		},
		children: [
			{
				find: function(newsPost) {
					var gameIds = newsPost.gameId;
					var totalGames = gameIds.length;

					return xbdGames.find({ _id: { $in: gameIds } }, {
						fields: {
							platform: 1,
							name: 1,
							slug: 1
						}
					});
				}
			},
			{
				find: function(newsPost) {
					var gameIds = newsPost.gameId;
					var totalGames = gameIds.length;

					return gameDetails.find({ gameId: { $in: gameIds } }, {
						fields: {
							gameId: 1,
							gameName: 1,
							gameDescription: 1,
							gameReducedDescription: 1,
							gameReleaseDate: 1,
							gameGenre: 1,
							gameArt: 1,
							gamePublisherName: 1,
							gameDeveloperName: 1,
							gameAllTimeAverageRating: 1
						}
					});
				}
			}
		]
	}
});