Meteor.methods({
	getGameAchievementCount: function(gameId) {
		var achievementCount = xbdAchievements.find({ gameId: gameId }).count();
		Meteor._debug(achievementCount);
		return achievementCount;
	}
});