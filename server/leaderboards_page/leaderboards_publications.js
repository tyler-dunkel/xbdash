Meteor.publish('currentUserLeaderboard', function() {
	return userLeaderboards.find({ 'userId': this.userId });
});

Meteor.publishComposite('dailyRanks', function() {
	return {
		find: function() {
			return userLeaderboards.find({'dailyRank.rank': { $gte: 1 } }, {
				sort: { 'dailyRank.rank': 1 },
				fields: {
					'userId': 1,
					'dailyRank': 1
				},
				limit: 25
			});
		},
		children: [
			{
				find: function(userStat) {
					return Meteor.users.find({ _id: userStat.userId }, {
						fields: {
							"gamercard.gamertag": 1,
							"gamercard.gamerscore": 1,
							"gamercard.gamerpicLargeSslImagePath": 1,
							"gamertagSlug": 1,
							"xboxProfile": 1
						}
					});
				}
			}
		]
	}
});

Meteor.publishComposite('overallRanks', function() {
	return {
		find: function() {
			return userLeaderboards.find({'overallRank': { $gte: 1 } }, {
				sort: { overallRank: 1 },
				fields: {
					'userId': 1,
					'overallRank': 1
				},
				limit: 25
			});
		},
		children: [
			{
				find: function(userStat) {
					return Meteor.users.find({ _id: userStat.userId }, {
						fields: {
							"gamercard.gamertag": 1,
							"gamercard.gamerscore": 1,
							"gamercard.gamerpicLargeSslImagePath": 1,
							"gamertagSlug": 1,
							"xboxProfile": 1
						}
					});
				}
			}
		]
	}
});

Meteor.publishComposite('completedAchievements', function() {
	return {
		find: function() {
			return userLeaderboards.find({
				'completedAchievements.rank': { $gte: 1 }
			}, {
				sort: { 'completedAchievements.rank': 1 },
				fields: {
					'userId': 1,
					'completedAchievements': 1
				},
				limit: 25
			});
		},
		children: [
			{
				find: function(userStat) {
					return Meteor.users.find({ _id: userStat.userId }, {
						fields: {
							"gamercard.gamertag": 1,
							"gamercard.gamerscore": 1,
							"gamercard.gamerpicLargeSslImagePath": 1,
							"gamertagSlug": 1,
							"xboxProfile": 1
						}
					});
				}
			}
		]
	}
});

Meteor.publishComposite('completedGames', function() {
	return {
		find: function() {
			return userLeaderboards.find({
				'completedGames.rank': { $gte: 1 }
			}, {
				sort: { 'completedGames.rank': 1 },
				fields: {
					'userId': 1,
					'completedGames': 1
				},
				limit: 25
			});
		},
		children: [
			{
				find: function(userStat) {
					return Meteor.users.find({ _id: userStat.userId }, {
						fields: {
							"gamercard.gamertag": 1,
							"gamercard.gamerscore": 1,
							"gamercard.gamerpicLargeSslImagePath": 1,
							"gamertagSlug": 1,
							"xboxProfile": 1
						}
					});
				}
			}
		]
	}
});

Meteor.publishComposite('commonAchievements', function() {
	return {
		find: function() {
			return userLeaderboards.find({
				'commonAchievements.rank': { $gte: 1 }
			}, {
				sort: { 'commonAchievements.rank': 1 },
				fields: {
					'userId': 1,
					'commonAchievements': 1
				},
				limit: 25
			});
		},
		children: [
			{
				find: function(userStat) {
					return Meteor.users.find({ _id: userStat.userId }, {
						fields: {
							"gamercard.gamertag": 1,
							"gamercard.gamerscore": 1,
							"gamercard.gamerpicLargeSslImagePath": 1,
							"gamertagSlug": 1,
							"xboxProfile": 1
						}
					});
				}
			}
		]
	}
});

Meteor.publishComposite('rareAchievements', function() {
	return {
		find: function() {
			return userLeaderboards.find({
				'rareAchievements.rank': { $gte: 1 }
			}, {
				sort: { 'rareAchievements.rank': 1 },
				fields: {
					'userId': 1,
					'rareAchievements': 1
				},
				limit: 25
			});
		},
		children: [
			{
				find: function(userStat) {
					return Meteor.users.find({ _id: userStat.userId }, {
						fields: {
							"gamercard.gamertag": 1,
							"gamercard.gamerscore": 1,
							"gamercard.gamerpicLargeSslImagePath": 1,
							"gamertagSlug": 1,
							"xboxProfile": 1
						}
					});
				}
			}
		]
	}
});

Meteor.publishComposite('epicAchievements', function() {
	return {
		find: function() {
			return userLeaderboards.find({
				'epicAchievements.rank': { $gte: 1 }
			}, {
				sort: { 'epicAchievements.rank': 1 },
				fields: {
					'userId': 1,
					'epicAchievements': 1
				},
				limit: 25
			});
		},
		children: [
			{
				find: function(userStat) {
					return Meteor.users.find({ _id: userStat.userId }, {
						fields: {
							"gamercard.gamertag": 1,
							"gamercard.gamerscore": 1,
							"gamercard.gamerpicLargeSslImagePath": 1,
							"gamertagSlug": 1,
							"xboxProfile": 1
						}
					});
				}
			}
		]
	}
});

Meteor.publishComposite('legendaryAchievements', function() {
	return {
		find: function() {
			return userLeaderboards.find({
				'legendaryAchievements.rank': { $gte: 1 }
			}, {
				sort: { 'legendaryAchievements.rank': 1 },
				fields: {
					'userId': 1,
					'legendaryAchievements': 1
				},
				limit: 25
			});
		},
		children: [
			{
				find: function(userStat) {
					return Meteor.users.find({ _id: userStat.userId }, {
						fields: {
							"gamercard.gamertag": 1,
							"gamercard.gamerscore": 1,
							"gamercard.gamerpicLargeSslImagePath": 1,
							"gamertagSlug": 1,
							"xboxProfile": 1
						}
					});
				}
			}
		]
	}
});