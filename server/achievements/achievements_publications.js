Meteor.publishComposite('topCommonAchievements', {
	find: function() {
		return xbdAchievements.find({
				userPercentage: { $gte: 61 }
			}, {
			fields: {
				gameId: 1,
				name: 1,
				mediaAssets: 1,
				description: 1,
				lockedDescription: 1,
				value: 1,
				userPercentage: 1,
				slug: 1
			},
			sort: { userPercentage: -1 },
			limit: 10
		});
	},
	children: [
		{
			find: function(achievement) {
				return xbdGames.find({ _id: achievement.gameId }, {
					fields: {
						platform: 1,
						name: 1,
						slug: 1
					}
				});
			}
		},
		{
			find: function(achievement) {
				return gameDetails.find({ gameId: achievement.gameId }, {
					fields: {
						gameId: 1,
						gameArt: 1
					}
				});
			}
		}
	]
});

Meteor.publishComposite('topRareAchievements', {
	find: function() {
		return xbdAchievements.find({
				userPercentage: { $gte: 31, $lte: 60 }
			}, {
			fields: {
				gameId: 1,
				name: 1,
				mediaAssets: 1,
				description: 1,
				lockedDescription: 1,
				value: 1,
				userPercentage: 1,
				slug: 1
			},
			sort: { userPercentage: -1 },
			limit: 10
		});
	},
	children: [
		{
			find: function(achievement) {
				return xbdGames.find({ _id: achievement.gameId }, {
					fields: {
						platform: 1,
						name: 1,
						slug: 1
					}
				});
			}
		},
		{
			find: function(achievement) {
				return gameDetails.find({ gameId: achievement.gameId }, {
					fields: {
						gameId: 1,
						gameArt: 1
					}
				});
			}
		}
	]
});

Meteor.publishComposite('topEpicAchievements', {
	find: function() {
		return xbdAchievements.find({
				userPercentage: { $gte: 11, $lte: 30 }
			}, {
			fields: {
				gameId: 1,
				name: 1,
				mediaAssets: 1,
				description: 1,
				lockedDescription: 1,
				value: 1,
				userPercentage: 1,
				slug: 1
			},
			sort: { userPercentage: -1 },
			limit: 10
		});
	},
	children: [
		{
			find: function(achievement) {
				return xbdGames.find({ _id: achievement.gameId }, {
					fields: {
						platform: 1,
						name: 1,
						slug: 1
					}
				});
			}
		},
		{
			find: function(achievement) {
				return gameDetails.find({ gameId: achievement.gameId }, {
					fields: {
						gameId: 1,
						gameArt: 1
					}
				});
			}
		}
	]
});

Meteor.publishComposite('topLegendaryAchievements', {
	find: function() {
		return xbdAchievements.find({
				userPercentage: { $gte: 0, $lte: 10 }
			}, {
			fields: {
				gameId: 1,
				name: 1,
				mediaAssets: 1,
				description: 1,
				lockedDescription: 1,
				value: 1,
				userPercentage: 1,
				slug: 1
			},
			sort: { userPercentage: -1 },
			limit: 10
		});
	},
	children: [
		{
			find: function(achievement) {
				return xbdGames.find({ _id: achievement.gameId }, {
					fields: {
						platform: 1,
						name: 1,
						slug: 1
					}
				});
			}
		},
		{
			find: function(achievement) {
				return gameDetails.find({ gameId: achievement.gameId }, {
					fields: {
						gameId: 1,
						gameArt: 1
					}
				});
			}
		}
	]
});

Meteor.publishComposite('singleAchievement', function(slug) {
	return {
		find: function() {
			check(slug, String);
			Meteor._debug("this is the single achievement one");
			return xbdAchievements.find({ slug: slug });
		},
		children: [
			{
				find: function(achievement) {
					return xbdAchievements.find({ gameId: achievement.gameId }, {
						fields: {
							gameId: 1,
							name: 1,
							mediaAssets: 1,
							description: 1,
							lockedDescription: 1,
							value: 1,
							userPercentage: 1,
							slug: 1
						}
					});
				}
			},
			{
				find: function(achievement) {
					return xbdGames.find({ _id: achievement.gameId }, {
						fields: {
							platform: 1,
							name: 1,
							slug: 1
						}
					});
				}
			},
			{
				find: function(achievement) {
					if (this.userId) {
						return userAchievements.find({ userId: this.userId, achievementId: achievement._id });
					}
				}
			}
		]
	}
});