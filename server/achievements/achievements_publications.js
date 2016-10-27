Meteor.publishComposite('topAchievements', {
	find: function() {
		return xbdAchievements.find({}, {
			fields: {
				gameId: 1,
				name: 1,
				mediaAssets: 1,
				description: 1,
				lockedDescription: 1,
				value: 1,
				slug: 1
			},
			limit: 50
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

Meteor.publishComposite('topCommonAchievements', {
	find: function() {
		return xbdAchievements.find({
				userPercentage: { $gte: 51 }
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
			limit: 12
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
				userPercentage: { $gte: 26, $lte: 50 }
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
			limit: 12
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
				userPercentage: { $gte: 11, $lte: 25 }
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
			limit: 12
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
			limit: 12
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

Meteor.publishComposite('achievementShowMoreTwo', function(options) {
	return {
		find: function() {
			var limit = options.limit || 25;

			return xbdAchievements.find({}, {
				fields: {
					gameId: 1,
					name: 1,
					mediaAssets: 1,
					description: 1,
					lockedDescription: 1,
					value: 1,
					slug: 1
				},
				limit: limit
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
							gameReducedName: 1,
							gameId: 1,
							gameArt: 1
						}
					});
				}
			}
		]
	}
});

Meteor.publishComposite('achievementShowMore', function(options) {
	return {
		find: function() {
			var limit = options.limit || 25,
				tier = options.tier || '';
			console.log('this is the tier' + tier);
			switch(tier) {
				case 'legendary': 
					topLimit = 10;
					bottomLimit = 0;
					break;
				case 'epic':
					console.log('it was epic');
					topLimit = 25;
					bottomLimit = 11;
					break;
				case 'rare':
					topLimit = 50;
					bottomLimit = 26;
					break;
				case 'common':
					topLimit = 100;
					bottomLimit = 51;
					break;
				default: 
					console.log('it went default');
					topLimit = 100;
					bottomLimit = 0;
			}

			return xbdAchievements.find({
				userPercentage: { $gte: bottomLimit, $lte: topLimit }
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
				limit: limit
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
							gameReducedName: 1,
							gameId: 1,
							gameArt: 1
						}
					});
				}
			}
		]
	}
});

// Meteor.publishComposite('achievementShowMore', function(options) {
// 	return {
// 		find: function() {
// 			var topLimit, bottomLimit;
// 			if (!options || !options.tier) return;
// 			switch(options.tier) {
// 				case 'legendary': 
// 					topLimit = 10;
// 					bottomLimit = 0;
// 					break;
// 				case 'epic':
// 					topLimit = 25;
// 					bottomLimit = 11;
// 					break;
// 				case 'rare':
// 					topLimit = 50;
// 					bottomLimit = 26;
// 					break;
// 				default: 
// 					topLimit = 100;
// 					bottomLimit = 51;
// 			}
// 			console.log(topLimit + ' ' + bottomLimit);
// 			console.log('limit is: ' + options.limit);
// 			return xbdAchievements.find({
// 				userPercentage: { $gte: bottomLimit, $lte: topLimit }
// 			}, {
// 				fields: {
// 					gameId: 1,
// 					name: 1,
// 					mediaAssets: 1,
// 					description: 1,
// 					lockedDescription: 1,
// 					value: 1,
// 					userPercentage: 1,
// 					slug: 1
// 				},
// 				sort: { userPercentage: -1 },
// 				limit: options.limit
// 			});
// 		},
// 		children: [
// 			{
// 				find: function(achievement) {
// 					return xbdGames.find({ _id: achievement.gameId }, {
// 						fields: {
// 							platform: 1,
// 							name: 1,
// 							slug: 1
// 						}
// 					});
// 				}
// 			},
// 			{
// 				find: function(achievement) {
// 					return gameDetails.find({ gameId: achievement.gameId }, {
// 						fields: {
// 							gameReducedName: 1,
// 							gameId: 1,
// 							gameArt: 1
// 						}
// 					});
// 				}
// 			}
// 		]
// 	}
// });