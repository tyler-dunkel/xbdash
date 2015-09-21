leaderboardsApi = leaderboardsApi || {};

leaderboardsApi.buildUserRanks = function(userId) {
	check(userId, String);
	var user = Meteor.users.findOne({ _id: userId });

	if (!user) return;
	if (!user.gamertagScanned) return;

	var userStats = {
		userId: userId,
		completedGames: 0,
		completedAchievements: 0,
		totalAchievements: 0,
		commonAchievements: 0,
		rareAchievements: 0,
		epicAchievements: 0,
		legendaryAchievements: 0
	};

	userLeaderboards.insert(userStats);

	this.updateUserRanks(userId);
}

leaderboardsApi.updateUserRanks = function(userId) {
	check(userId, String);
	var date = moment().format();
	this.countUserCompletedGames(userId);
	this.countCompletedAchievements(userId);
	this.countTotalAchievements(userId);
	this.countCommonAchievements(userId);
	this.countRareAchievements(userId);
	this.countEpicAchievements(userId);
	this.countLegendaryAchievements(userId);
	userLeaderboards.update({ userId: userId }, { $set: { updated: date } });
}

leaderboardsApi.countUserCompletedGames = function(userId) {
	check(userId, String);
	var completedGames = userGames.find({ userId: userId, completed: true });
	var count = completedGames ? completedGames.count() : 0;
	userLeaderboards.update({ userId: userId }, { $set: { completedGames: count } });
}

leaderboardsApi.countCompletedAchievements = function(userId) {
	check(userId, String);
	var completedAchievements = userAchievements.find({ userId: userId, progressState: true });
	var count = completedAchievements ? completedAchievements.count() : 0;
	userLeaderboards.update({ userId: userId }, { $set: { completedAchievements: count } });
}

leaderboardsApi.countTotalAchievements = function(userId) {
	check(userId, String);
	var totalAchievements = userAchievements.find({ userId: userId });
	var count = totalAchievements ? totalAchievements.count() : 0;
	userLeaderboards.update({ userId: userId }, { $set: { totalAchievements: count } });
}

leaderboardsApi.countCommonAchievements = function(userId) {
	check(userId, String);
	var commonCount = 0;
	var userAchievement = userAchievements.find({ userId: userId, progressState: true });
	if (!userAchievement) return;
	userAchievement.forEach(function(a) {
		var achievement = xbdAchievements.findOne({ _id: a.achievementId });
		var userPercentage = achievement.userPercentage;
		if (userPercentage && userPercentage >= 61) {
			commonCount++;
		}
	});
	userLeaderboards.update({ userId: userId }, { $set: { commonAchievements: commonCount } });
}

leaderboardsApi.countRareAchievements = function(userId) {
	check(userId, String);
	var rareCount = 0;
	var userAchievement = userAchievements.find({ userId: userId, progressState: true });
	if (!userAchievement) return;
	userAchievement.forEach(function(a) {
		var achievement = xbdAchievements.findOne({ _id: a.achievementId });
		var userPercentage = achievement.userPercentage;
		if (userPercentage && (userPercentage >= 31 && userPercentage <= 60)) {
			rareCount++;
		}
	});
	userLeaderboards.update({ userId: userId }, { $set: { commonAchievements: rareCount } });
}

leaderboardsApi.countEpicAchievements = function(userId) {
	check(userId, String);
	// if (userPercentage >= 11 && userPercentage <= 30) {
}

leaderboardsApi.countLegendaryAchievements = function(userId) {
	check(userId, String);
	// if (userPercentage >= 0 && userPercentage <= 10) {
}