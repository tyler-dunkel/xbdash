leaderboardsApi = leaderboardsApi || {};

leaderboardsApi.buildUserRanks = function(userId) {
	check(userId, String);
	var user = Meteor.users.findOne({ _id: userId });

	if (!user) return;
	if (!user.gamertagScanned) return;

	var userStat = userLeaderboards.find({userId: userId});
	if (userStat.count() > 0) return;

	var userStats = {
		userId: userId,
		overallRank: 0,
		dailyRank: { value: 0, rank: 0 },
		completedGames: { count: 0, rank: 0 },
		completedAchievements: { count: 0, rank: 0 },
		totalAchievements: { count: 0, rank: 0 },
		commonAchievements: { count: 0, rank: 0 },
		rareAchievements: { count: 0, rank: 0 },
		epicAchievements: { count: 0, rank: 0 },
		legendaryAchievements: { count: 0, rank: 0 }
	};

	userLeaderboards.insert(userStats);
}

leaderboardsApi.updateUserCounts = function(userId) {
	check(userId, String);

	this.countUserCompletedGames(userId);
	this.countCompletedAchievements(userId);
	this.countTotalAchievements(userId);
	this.countCommonAchievements(userId);
	this.countRareAchievements(userId);
	this.countEpicAchievements(userId);
	this.countLegendaryAchievements(userId);

	var date = moment().format();

	userLeaderboards.update({ userId: userId }, { $set: { updated: date } });
}

leaderboardsApi.updateUserRanks = function() {
	this.updateOverallRank();
	this.dailyRank();
	this.updateUserCompletedGamesRank();
	this.updateCompletedAchievementsRank();
	this.updateTotalAchievementsRank();
	this.updateCommonAchievementsRank();
	this.updateRareAchievementsRank();
	this.updateEpicAchievementsRank();
	this.updateLegendaryAchievementsRank();
}

leaderboardsApi.updateOverallRank = function() {
	var userOverallRank = 1;
	var users = Meteor.users.find({ "profile.gamercard.gamerscore": { $gt: 1 } }, { sort: { "profile.gamercard.gamerscore": -1 } });
	if (!users) return;
	users.forEach(function(user) {
		userLeaderboards.update({ userId: user._id }, { $set: { 'overallRank': userOverallRank } });
		userOverallRank++;
	});
}

leaderboardsApi.dailyRank = function() {
	var userDailyGamerscore = 0;
	var users = Meteor.users.find({ 'profile.gamercard.gamerscore': { $gt: 1 } });
	var oneDay = moment().startOf('day').toDate();
	//if (!users) return;

	//find each users gamerscore for the past 24 hours and put it into a field called userDailyGamerscore
	users.forEach(function(user){
		var userDailyAchievements = userAchievements.find({ userId: user._id, progressState: true, progression: { $gte: oneDay } });
		if (!userDailyAchievements) {
			userLeaderboards.update({ userId: user._id }, { $set: { 'dailyRank.value': userDailyGamerscore } });
			return;
		}
		userDailyAchievements.forEach(function(achievement) {
			var singleAchievement = xbdAchievements.findOne({ _id: achievement.achievementId });
			userDailyGamerscore += singleAchievement.value;
		});
		userLeaderboards.update({ userId: user._id }, { $set: { 'dailyRank.value': userDailyGamerscore } });
	});

	//find each user and assign them a daily rank based upon the above computed userDailyGamerscore
	var userDailyRank = 1;
	var userStats = userLeaderboards.find({ 'dailyRank.value': { $gt: 1 } }, { $sort: { 'dailyRank.value': -1 } });
	userStats.forEach(function(userStat){
		userLeaderboards.update({ userId: userStat.userId }, { $set: { 'dailyRank.rank': userDailyRank } });
		userDailyRank++;
	});
}

leaderboardsApi.countUserCompletedGames = function(userId) {
	check(userId, String);
	var completedGames = userGames.find({ userId: userId, completed: true });
	var count = completedGames ? completedGames.count() : 0;
	userLeaderboards.update({ userId: userId }, { $set: { 'completedGames.count': count } });
}

leaderboardsApi.updateUserCompletedGamesRank = function() {
	var rank = 1;
	var userStats = userLeaderboards.find({}, { sort: { 'completedGames.count': -1 } });
	if (!userStats) return;
	userStats.forEach(function(userStat) {
		userLeaderboards.update({ userId: userStat.userId }, { $set: { 'completedGames.rank': rank } });
		rank++;
	});
}

leaderboardsApi.countCompletedAchievements = function(userId) {
	check(userId, String);
	var completedAchievements = userAchievements.find({ userId: userId, progressState: true });
	var count = completedAchievements ? completedAchievements.count() : 0;
	userLeaderboards.update({ userId: userId }, { $set: { 'completedAchievements.count': count } });
}

leaderboardsApi.updateCompletedAchievementsRank = function() {
	var rank = 1;
	var userStats = userLeaderboards.find({}, { sort: { 'completedAchievements.count': -1 } });
	if (!userStats) return;
	userStats.forEach(function(userStat) {
		userLeaderboards.update({ userId: userStat.userId }, { $set: { 'completedAchievements.rank': rank } });
		rank++;
	});
}

leaderboardsApi.countTotalAchievements = function(userId) {
	check(userId, String);
	var totalAchievements = userAchievements.find({ userId: userId });
	var count = totalAchievements ? totalAchievements.count() : 0;
	userLeaderboards.update({ userId: userId }, { $set: { 'totalAchievements.count': count } });
}

leaderboardsApi.updateTotalAchievementsRank = function() {
	var rank = 1;
	var userStats = userLeaderboards.find({}, { sort: { 'totalAchievements.count': -1 } });
	if (!userStats) return;
	userStats.forEach(function(userStat) {
		userLeaderboards.update({ userId: userStat.userId }, { $set: { 'totalAchievements.rank': rank } });
		rank++;
	});
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
	userLeaderboards.update({ userId: userId }, { $set: { 'commonAchievements.count': commonCount } });
}

leaderboardsApi.updateCommonAchievementsRank = function() {
	var rank = 1;
	var userStats = userLeaderboards.find({}, { sort: { 'commonAchievements.count': -1 } });
	if (!userStats) return;
	userStats.forEach(function(userStat) {
		userLeaderboards.update({ userId: userStat.userId }, { $set: { 'commonAchievements.rank': rank } });
		rank++;
	});
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
	userLeaderboards.update({ userId: userId }, { $set: { 'rareAchievements.count': rareCount } });
}

leaderboardsApi.updateRareAchievementsRank = function() {
	var rank = 1;
	var userStats = userLeaderboards.find({}, { sort: { 'rareAchievements.count': -1 } });
	if (!userStats) return;
	userStats.forEach(function(userStat) {
		userLeaderboards.update({ userId: userStat.userId }, { $set: { 'rareAchievements.rank': rank } });
		rank++;
	});
}

leaderboardsApi.countEpicAchievements = function(userId) {
	check(userId, String);
	var epicCount = 0;
	var userAchievement = userAchievements.find({ userId: userId, progressState: true });
	if (!userAchievement) return;
	userAchievement.forEach(function(a) {
		var achievement = xbdAchievements.findOne({ _id: a.achievementId });
		var userPercentage = achievement.userPercentage;
		if (userPercentage && (userPercentage >= 11 && userPercentage <= 30)) {
			epicCount++;
		}
	});
	userLeaderboards.update({ userId: userId }, { $set: { 'epicAchievements.count': epicCount } });
}

leaderboardsApi.updateEpicAchievementsRank = function() {
	var rank = 1;
	var userStats = userLeaderboards.find({}, { sort: { 'epicAchievements.count': -1 } });
	if (!userStats) return;
	userStats.forEach(function(userStat) {
		userLeaderboards.update({ userId: userStat.userId }, { $set: { 'epicAchievements.rank': rank } });
		rank++;
	});
}

leaderboardsApi.countLegendaryAchievements = function(userId) {
	check(userId, String);
	var legendaryCount = 0;
	var userAchievement = userAchievements.find({ userId: userId, progressState: true });
	if (!userAchievement) return;
	userAchievement.forEach(function(a) {
		var achievement = xbdAchievements.findOne({ _id: a.achievementId });
		var userPercentage = achievement.userPercentage;
		if (userPercentage && (userPercentage >= 0 && userPercentage <= 10)) {
			legendaryCount++;
		}
	});
	userLeaderboards.update({ userId: userId }, { $set: { 'legendaryAchievements.count': legendaryCount } });
}

leaderboardsApi.updateLegendaryAchievementsRank = function() {
	var rank = 1;
	var userStats = userLeaderboards.find({}, { sort: { 'legendaryAchievements.count': -1 } });
	if (!userStats) return;
	userStats.forEach(function(userStat) {
		userLeaderboards.update({ userId: userStat.userId }, { $set: { 'legendaryAchievements.rank': rank } });
		rank++;
	});
}