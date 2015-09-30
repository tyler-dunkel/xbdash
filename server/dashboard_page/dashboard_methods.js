Meteor.methods({
	getGameAchievementCount: function(gameId) {
		check(gameId, String);
		var xbdGame = xbdGames.findOne({_id: gameId});
		var achievementCount = xbdAchievements.find({ gameId: gameId }).count();
		return achievementCount;
	},
	getMaxGamerscore: function() {
		this.unblock();
		var user = Meteor.user();
		if (!user || !user.gamertagScanned) return;
		var maxGamerscore = 0;
		var getUserGames = userGames.find({ userId: user._id });


		getUserGames.forEach(function(userGame) {
			var xbdGameValue = xbdGames.findOne({ _id: userGame.gameId }, { fields: { maxGamerscore: 1 } }).maxGamerscore;
			maxGamerscore += xbdGameValue;
		});

		return maxGamerscore;
	}
});