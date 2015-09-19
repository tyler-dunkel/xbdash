// Meteor.publish('dashboardMainCharts', function(dateRange) {
// 	if (!this.userId) return;
// 	return userAchievements.find({ userId: this.userId, progressState: true, progression: { $gt: dateRange } }, { fields: { achievementId: 1, userId: 1, progressState: 1, progression: 1 }, sort: { progression: -1 }, limit: 50 });
// });

Meteor.publishComposite('dashboardMainCharts', function(dateRange) {
	return {
		find: function() {
			var user = Meteor.users.findOne({ _id: this.userId });
			if (!user) return;
			if (!user.gamertagScanned) return;
			Meteor._debug(dateRange);
			return userAchievements.find({ userId: this.userId, progressState: true, progression: { $gt: dateRange } }, {
				fields: {
					achievementId: 1,
					userId: 1,
					progressState: 1,
					progression: 1
				},
				sort: { progression: -1 },
				limit: 100
			});
		},
		children: [
			{
				find: function(achievement) {
					return xbdAchievements.find({ _id: achievement.achievementId }, { fields: { value: 1 } });
				}
			}
		]
	}
});

Meteor.publishComposite('dashboardGameGenreChart', {
	find: function() {
		var user = Meteor.users.findOne({ _id: this.userId });
		if (!user) return;
		if (!user.gamertagScanned) return;
		return userGames.find({ userId: this.userId }, {
			fields: {
				gameId: 1,
				userId: 1,
				earnedAchievements: 1
			}
		});
	},
	children: [
		{
			find: function(game) {
				return gameDetails.find({ gameId: game.gameId }, {
					fields: {
						gameId: 1,
						gameGenre: 1
					}
				});
			}
		}
	]
});

Meteor.publish('dashboardStatsCompletedAchievements', function() {
	var user = Meteor.users.findOne({ _id: this.userId });
	if (!user) return;
	if (!user.gamertagScanned) return;

	var self = this;
	var achievementsCompleted = userAchievements.aggregate([
		{
			$match: {
				userId: this.userId,
				progressState: true
			}
		},
		{
			$group: {
				_id: "$userId",
				achievementCount: { $sum: 1 }
			}
		}
	]);
	self.added('dashboard_stats_completed_achievements',  achievementsCompleted[0]._id,
		{
			achievementCount: achievementsCompleted[0].achievementCount
		});
	self.ready();
});


Meteor.publish('dashboardStatsTotalAchievements', function () {
	var user = Meteor.users.findOne({ _id: this.userId });
	if (!user) return;
	if (!user.gamertagScanned) return;

	var self = this;
	var totalAchievements = userAchievements.aggregate([
		{
			$match: {
				userId: this.userId
			}
		},
		{
			$group: {
				_id: "$userId",
				achievementCount: { $sum: 1 }
			}
		}
	]);
	self.added('dashboard_stats_total_achievements', totalAchievements[0]._id,
	{
		achievementCount: totalAchievements[0].achievementCount
	});
	self.ready();
});

Meteor.publish('dashboardStatsCompletedGames', function () {
	var user = Meteor.users.findOne({ _id: this.userId });
	if (!user) return;
	if (!user.gamertagScanned) return;

	var self = this;
	var gamesCompleted = userGames.aggregate([
		{
			$match: {
				userId: this.userId,
				completed: true
			}
		},
		{
			$group: {
				_id: "$userId",
				gameCount: { $sum: 1 }
			}
		}
	]);
	if (gamesCompleted.length === 0) {
		self.added('dashboard_stats_completed_games', this.userId, {
			gameCount: 0
		});
	} else {
		self.added('dashboard_stats_completed_games', gamesCompleted[0]._id, {
			gameCount: gamesCompleted[0].gameCount
		});
	}
	self.ready();
});

Meteor.publish('dashboardStatsTotalGames', function () {
	var user = Meteor.users.findOne({ _id: this.userId });
	if (!user) return;
	if (!user.gamertagScanned) return;

	var self = this;
	var totalGames = userGames.aggregate([
		{
			$match: {
				userId: this.userId,
			}
		},
		{
			$group: {
				_id: "$userId",
				gameCount: { $sum: 1 }
			}
		}
	]);
	self.added('dashboard_stats_total_games', totalGames[0]._id, {
		gameCount: totalGames[0].gameCount
	});
	self.ready();
});

Meteor.publishComposite('dashboardRecentActivity', {
	find: function() {
		var user = Meteor.users.findOne({ _id: this.userId });
		if (!user) return;
		if (!user.gamertagScanned) return;
		
		return userGames.find({ userId: this.userId, currentGamerscore: { $gt: 1 } }, {
			fields: {
				gameId: 1,
				lastUnlock: 1,
				earnedAchievements: 1
			},
			sort: { lastUnlock: -1 },
			limit: 10
		});
	},
	children: [
		{
			find: function(game) {
				return gameDetails.find({ gameId: game.gameId }, { fields: { gameArt: 1 }});
			}
		},
		{
			find: function(game) {
				return xbdGames.find({ _id: game.gameId }, {
					fields: {
						platform: 1,
						name: 1,
						maxGamerscore: 1,
						slug: 1
					}
				});
			}
		}
	]
});