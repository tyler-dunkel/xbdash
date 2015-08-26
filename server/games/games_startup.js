Meteor.startup(function() {
	Meteor.setInterval(function() {
		var gamesNotComplete = userGames.find({ completed: false });

		if (gamesNotComplete.count() < 1) {
			Meteor._debug("no incomplete games");
			return;
		}

		gamesNotComplete.forEach(function(game) {
			var xbdGame = xbdGames.findOne({ _id: game.gameId });
			if (game.currentGamerscore === xbdGame.maxGamerscore) {
				userGames.update({ _id: game._id }, { $set: { completed: true }});
			}
		});
	}, 10000);
});