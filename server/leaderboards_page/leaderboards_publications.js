// daily rank, overall rank (total gamerscore), completed achievements, completed games
// common, rare, epic, legendary

Meteor.publishComposite('dailyRank', function() {
	return {
		find: function() {
			return userLeaderboards.find({
				'dailyRank.value': { $gt: 1 }
			}, {
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
							"profile.gamercard.gamertag": 1,
							"profile.gamercard.gamerscore": 1,
							"profile.gamercard.gamerpicLargeSslImagePath": 1
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
							"profile.gamercard.gamertag": 1,
							"profile.gamercard.gamerscore": 1,
							"profile.gamercard.gamerpicLargeSslImagePath": 1
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
							"profile.gamercard.gamertag": 1,
							"profile.gamercard.gamerscore": 1,
							"profile.gamercard.gamerpicLargeSslImagePath": 1
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
							"profile.gamercard.gamertag": 1,
							"profile.gamercard.gamerscore": 1,
							"profile.gamercard.gamerpicLargeSslImagePath": 1
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
				sort: { 'commonAchievements.count': -1 },
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
							"profile.gamercard.gamertag": 1,
							"profile.gamercard.gamerscore": 1,
							"profile.gamercard.gamerpicLargeSslImagePath": 1						}
					});
				}
			}
		]
	}
});

Meteor.publishComposite('rareAchievements', function() {
	return {
		find: function() {
			return userLeaderboards.find({}, {
				sort: { 'rareAchievements.count': -1 },
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
							"profile.gamercard.gamertag": 1,
							"profile.gamercard.gamerscore": 1,
							"profile.gamercard.gamerpicLargeSslImagePath": 1						}
					});
				}
			}
		]
	}
});

Meteor.publishComposite('epicAchievements', function() {
	return {
		find: function() {
			return userLeaderboards.find({}, {
				sort: { 'epicAchievements.count': -1 },
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
							"profile.gamercard.gamertag": 1,
							"profile.gamercard.gamerscore": 1,
							"profile.gamercard.gamerpicLargeSslImagePath": 1						}
					});
				}
			}
		]
	}
});

Meteor.publishComposite('legendaryAchievements', function() {
	return {
		find: function() {
			return userLeaderboards.find({}, {
				sort: { 'legendaryAchievements.count': -1 },
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
							"profile.gamercard.gamertag": 1,
							"profile.gamercard.gamerscore": 1,
							"profile.gamercard.gamerpicLargeSslImagePath": 1						}
					});
				}
			}
		]
	}
});