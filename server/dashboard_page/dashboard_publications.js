Meteor.publish('dashboardStatsCompletedAchievements', function() {
	var self = this;
	if (!this.userId) return;
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
	var self = this;
	if (!this.userId) return;
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
	var self = this;
	if (!this.userId) return;
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
	self.added('dashboard_stats_completed_games', gamesCompleted[0]._id, {
		gameCount: gamesCompleted[0].gameCount
	});
	self.ready();
});

Meteor.publish('dashboardStatsTotalGames', function () {
	var self = this;
	if (!this.userId) return;
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