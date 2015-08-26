Meteor.publishComposite('myTopGames', {
	find: function() {
		if (!this.userId) {
			Meteor._debug("fired publish  game by gamerscore function");
			return xbdGames.find({}, { sort: { maxGamerscore: -1 }, limit: 25 });
		}
		return userGames.find({ _id: this.userId }, { sort: { currentGamerscore: -1 }, limit: 25 });
	}, 
	children: [
		{
			find: function(game) {
				var id;
				if (!this.userId) {
					id = game._id;
				} else {
					id = game.gameId;
				}
				return gameDetails.find({ gameId: id });
			}
		},
		{
			find: function(game) {
				if (!this.userId) {
					Meteor._debug("no user id " + game);
					return;
				}
				return xbdGames.find({ _id: game.gameId });
			}
		}
	]
});

Meteor.publishComposite('gamesByReleaseDate', {
	find: function() {
		Meteor._debug("fired game by releaese date");
		return gameDetails.find({}, { sort: { gameReleaseDate: -1 }, limit: 18 });
	},
	children: [
		{
			find: function(game) {
				return xbdGames.find({ _id: game.gameId });
			}
		},
		{
			find: function(game) {
				if (!this.userId) {
					return;
				}
				return userGames.find({ gameId: game.gameId });
			}
		}
	]
});

Meteor.publish('gameDetails', function(id) {
	Meteor._debug(id);
	return gameDetails.find({ gameId: id });
});

Meteor.publishComposite('singleGame', function(slug) {
	return {
		find: function() {
			Meteor._debug("this is the single game one");
			return xbdGames.find({ slug: slug });
		},
		children: [
			{
				find: function(game) {
					return gameDetails.find({ gameId: game._id });
				}
			},
			{
				find: function(game) {
					if (this.userId && this.gameId !== 'undefined') {
						return userGames.find({ gameId: game._id });
					}
				}
			},
			{
				find: function(game) {
					return xbdAchievements.find({ gameId: game._id });
				},
				children: [
					{
						find: function(achievement) {
							return userAchievements.find({ achievementId: achievement._id });
						}
					}
				]
			}
		]
	}
});