Meteor.publishComposite('myTopGames', {
	find: function() {
		var user = Meteor.users.findOne({ _id: this.userId });
		if (!user || !user.gamertagScanned) {
			Meteor._debug("fired publish  game by gamerscore function");
			return xbdGames.find({}, {
				sort: { maxGamerscore: -1 },
				fields: {
					platform: 1,
					name: 1,
					maxGamerscore: 1,
					slug: 1
				},
				limit: 10
			});
		}
		return userGames.find({ userId: this.userId }, {
			sort: { currentGamerscore: -1 },
			fields: {
				gameId: 1,
				userId: 1,
				currentGamerscore: 1
			},
			limit: 10
		});
	}, 
	children: [
		{
			find: function(game) {
				var id;
				var user = Meteor.users.findOne({_id: this.userId});
				if (!user || !user.gamertagScanned) {
					id = game._id;
				} else {
					id = game.gameId;
				}
				return gameDetails.find({ gameId: id }, {
					fields: {
	                    gameId: 1,
	                    gameName: 1,
	                    gameReleaseDate: 1,
	                    gameGenre: 1,
	                    gameArt: 1,
	                    gamePublisherName: 1,
	                    gameAllTimeAverageRating: 1
	                }
				});
			}
		},
		{
			find: function(game) {
				var user = Meteor.users.findOne({_id: this.userId});
				if (!user || !user.gamertagScanned) {
					Meteor._debug("no user id " + game);
					return;
				}
				return xbdGames.find({ _id: game.gameId }, {
					sort: { maxGamerscore: -1 },
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

Meteor.publishComposite('gameDetails', function(id) {
	return {
		find: function() {
			return gameDetails.findOne({ gameId: id });
		},
		children: [
			{
				find: function(game) {
					return xbdGames.find({ _id: game.gameId }, {
						fields: {
							platform: 1,
							name: 1,
							slug: 1
						}
					});
				}
			}
		]
	}
});

Meteor.publishComposite('singleGame', function(slug) {
	return {
		find: function() {
			return xbdGames.find({ slug: slug }, {
				fields: {
					platform: 1,
					name: 1,
					maxGamerscore: 1,
					slug: 1
				}
			});
		},
		children: [
			{
				find: function(game) {
					return gameDetails.find({ gameId: game._id }, {
						fields: {
							gameId: 1,
							gameName: 1,
							gameName: 1,
							gameDescription: 1,
							gameReleaseDate: 1,
							gameGenre: 1,
							gameArt: 1,
							gamePublisherName: 1,
							gameAllTimeAverageRating: 1
						}
					});
				}
			},
			{
				find: function(game) {
					if (this.userId && this.gameId !== 'undefined') {
						return userGames.find({ gameId: game._id }, {
							fields: {
								gameId: 1,
								userId: 1,
								currentGamerscore: 1,
								earnedAchievements: 1,
								completed: 1
							}
						});
					}
				}
			}
		]
	}
});

Meteor.publishComposite('singleGameAchievements', function(slug) {
	return {
		find: function() {
			var game = xbdGames.findOne({ slug: slug });

			return xbdAchievements.find({ gameId: game._id }, {
				fields: {
					gameId: 1,
					name: 1,
					mediaAssets: 1,
					description: 1,
					value: 1,
					slug: 1,
					userPercentage: 1
				}
			});
		},
		children: [
			{
				find: function(achievement) {
					if (this.userId && this.gameId !== 'undefined') {
						return userAchievements.find({ achievementId: achievement._id }, {
							sort: { progressState: -1 },
							fields: {
								achievementId: 1,
								userId: 1,
								progressState: 1
							}
						});
					}
				}
			}
		]
	}
});