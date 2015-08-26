Meteor.methods({
	getGameAchievementCount: function(gameId) {
		var achievementCount = xbdAchievements.find({ gameId: gameId }).count();
		Meteor._debug(achievementCount);
		return achievementCount;
	},
	getMaxGamerscore: function() {
		this.unblock();
		var user = Meteor.user();
		if (!user || !user.gamertagScanned) return;
		Meteor._debug(user);
		var maxGamerscore = 0;
		var getUserGames = userGames.find({ userId: user._id });
		//Meteor._debug(getUserGames);
		//if (getUserGames.count() > 1) return 0;

		getUserGames.forEach(function(userGame) {
			var xbdGameValue = xbdGames.findOne({ _id: userGame.gameId }, { fields: { maxGamerscore: 1 } }).maxGamerscore;
			maxGamerscore += xbdGameValue;
			Meteor._debug(maxGamerscore);
		});

		return maxGamerscore;
	}
});