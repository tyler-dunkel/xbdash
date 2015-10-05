// daily rank, overall rank (total gamerscore), completed achievements, completed games
// common, rare, epic, legendary

Meteor.publishComposite('dailyRanks', function() {
	return {
		find: function() {
			return userLeaderboards.find({}, {
				sort: { 'dailyRank.rank': 1 },
				fields: {
					'userId': 1,
					'dailyRank': 1
				},
				limit: 100
			});
		},
		children: [
			{
				find: function(userStat) {
					return Meteor.users.find({ _id: userStat.userId }, {
						fields: {
							"gamercard.gamertag": 1,
							"gamercard.gamerscore": 1,
							"gamercard.gamerpicLargeSslImagePath": 1
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
			return userLeaderboards.find({}, {
				sort: { overallRank: 1 },
				fields: {
					'userId': 1,
					'overallRank': 1
				},
				limit: 100
			});
		},
		children: [
			{
				find: function(userStat) {
					return Meteor.users.find({ _id: userStat.userId }, {
						fields: {
							"gamercard.gamertag": 1,
							"gamercard.gamerscore": 1,
							"gamercard.gamerpicLargeSslImagePath": 1
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
				'completedAchievements.count': { $gt: 1 }
			}, {
				sort: { 'completedAchievements.rank': 1 },
				fields: {
					'userId': 1,
					'completedAchievements': 1
				},
				limit: 100
			});
		},
		children: [
			{
				find: function(userStat) {
					return Meteor.users.find({ _id: userStat.userId }, {
						fields: {
							"gamercard.gamertag": 1,
							"gamercard.gamerscore": 1,
							"gamercard.gamerpicLargeSslImagePath": 1
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
				'completedGames.count': { $gt: 1 }
			}, {
				sort: { 'completedGames.rank': 1 },
				fields: {
					'userId': 1,
					'completedGames': 1
				},
				limit: 100
			});
		},
		children: [
			{
				find: function(userStat) {
					return Meteor.users.find({ _id: userStat.userId }, {
						fields: {
							"gamercard.gamertag": 1,
							"gamercard.gamerscore": 1,
							"gamercard.gamerpicLargeSslImagePath": 1
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
				'commonAchievements.count': { $gt: 1 }
			}, {
				sort: { 'commonAchievements.rank': 1 },
				fields: {
					'userId': 1,
					'commonAchievements': 1
				},
				limit: 100
			});
		},
		children: [
			{
				find: function(userStat) {
					return Meteor.users.find({ _id: userStat.userId }, {
						fields: {
							"gamercard.gamertag": 1,
							"gamercard.gamerscore": 1,
							"gamercard.gamerpicLargeSslImagePath": 1
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
				'rareAchievements.count': { $gt: 1 }
			}, {
				sort: { 'rareAchievements.rank': 1 },
				fields: {
					'userId': 1,
					'rareAchievements': 1
				},
				limit: 100
			});
		},
		children: [
			{
				find: function(userStat) {
					return Meteor.users.find({ _id: userStat.userId }, {
						fields: {
							"gamercard.gamertag": 1,
							"gamercard.gamerscore": 1,
							"gamercard.gamerpicLargeSslImagePath": 1
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
				'epicAchievements.count': { $gt: 1 }
			}, {
				sort: { 'epicAchievements.rank': 1 },
				fields: {
					'userId': 1,
					'epicAchievements': 1
				},
				limit: 100
			});
		},
		children: [
			{
				find: function(userStat) {
					return Meteor.users.find({ _id: userStat.userId }, {
						fields: {
							"gamercard.gamertag": 1,
							"gamercard.gamerscore": 1,
							"gamercard.gamerpicLargeSslImagePath": 1
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
				'legendaryAchievements.count': { $gt: 1 }
			}, {
				sort: { 'legendaryAchievements.rank': 1 },
				fields: {
					'userId': 1,
					'legendaryAchievements': 1
				},
				limit: 100
			});
		},
		children: [
			{
				find: function(userStat) {
					return Meteor.users.find({ _id: userStat.userId }, {
						fields: {
							"gamercard.gamertag": 1,
							"gamercard.gamerscore": 1,
							"gamercard.gamerpicLargeSslImagePath": 1
						}
					});
				}
			}
		]
	}
});