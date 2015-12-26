Meteor.publishComposite('myTopGames', {
	find: function() {
		var user = Meteor.users.findOne({ _id: this.userId });
		if (!user) {
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
		if (user.gamertagScanned.status === 'false' || user.gamertagScanned.status === 'building') {
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
				var user = Meteor.users.findOne({ _id: this.userId });
				if (!user) {
					id = game._id;
				} else {
					id = game.gameId;
				}
				if (user) {
					if (user.gamertagScanned.status === 'false' || user.gamertagScanned.status === 'building') {
						id = game._id;
					}
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
				if (!user) {
					Meteor._debug("no user id " + game);
					return;
				}
				if (user) {
					if (user.gamertagScanned.status === 'false' || user.gamertagScanned.status === 'building') {
						Meteor._debug("gamertag not scanned");
						return;
					}
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
		return gameDetails.find({}, {
			fields: {
                gameId: 1,
                gameName: 1,
                gameReleaseDate: 1,
                gameGenre: 1,
                gameArt: 1,
                gamePublisherName: 1,
                gameAllTimeAverageRating: 1
            },
            sort: { gameReleaseDate: -1 },
            limit: 10
        });
	},
	children: [
		{
			find: function(game) {
				return xbdGames.find({ _id: game.gameId }, {
					fields: {
		                platform: 1,
		                name: 1,
		                maxGamerscore: 1,
		                slug: 1
		            }
				});
			}
		},
		{
			find: function(game) {
				var user = Meteor.users.findOne({ _id: this.userId });
				if (!user) return;
				if (user) {
					if (user.gamertagScanned.status === 'false' || user.gamertagScanned.status === 'building') {
						return;
					}
				}
				return userGames.find({ userId: this.userId, gameId: game.gameId }, {
					fields: {
						gameId: 1,
						userId: 1,
						currentGamerscore: 1
					}
				});
			}
		}
	]
});

// Search system does not work with publish composite
Meteor.publish('gameDetailsSearch', function(id) {
	check(id, String);
	return gameDetails.find({ gameId: id }, {
		fields: {
			gameId: 1,
			gamePublisherName: 1,
			gameReleaseDate: 1,
			gameGenre: 1,
			gameArt: 1
		}
	});
});

Meteor.publishComposite('singleGame', function(slug) {
	return {
		find: function() {
			check(slug, String);
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
			check(slug, String);
			var game = xbdGames.findOne({ slug: slug });
			return xbdAchievements.find({ gameId: game._id }, {
				sort: {
	                value: 1,
	                name: 1
	            },
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
					var user = Meteor.users.findOne({ _id: this.userId });
					// if (user && user.gamertagScanned) {
					if (user) {
						if (user.gamertagScanned.status === 'true' || user.gamertagScanned.status === 'updating') {
							return userAchievements.find({ userId: this.userId, achievementId: achievement._id }, {
								sort: {
									progressState: -1
								},
								fields: {
									achievementId: 1,
									userId: 1,
									progressState: 1
								}
							});
						}
					}
				}
			}
		]
	}
});