Meteor.methods({
	getGameAchievementCount: function(gameId) {
		check(gameId, String);
		var achievementCount = xbdAchievements.find({ gameId: gameId }).count();
		return achievementCount;
	},
	getMaxGamerscore: function() {
		this.unblock();
		
		var user = Meteor.user();
		var maxGamerscore = 0;
		var getUserGames = userGames.find({ userId: user._id });

		if (!user) return;
		if (user.gamertagScanned.status === 'false' || user.gamertagScanned.status === 'building') return;
		
		getUserGames.forEach(function(userGame) {
			var xbdGameValue = xbdGames.findOne({ _id: userGame.gameId }, { fields: { maxGamerscore: 1 } }).maxGamerscore;
			maxGamerscore += xbdGameValue;
		});

		return maxGamerscore;
	}
});