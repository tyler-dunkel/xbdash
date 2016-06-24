Meteor.publish('userProfile', function(gamertagSlug) {
	check(gamertagSlug, String);
	return Meteor.users.find({ gamertagSlug: gamertagSlug }, {
		fields: {
			"createdAt": 1,
			"services.twitter": 1,
			"emails": 1,
			"gamercard": 1,	
			"gamertagSlug": 1,
			"xboxProfile": 1,
			"presence": 1
		}
	});
});

Meteor.publish('userRanks', function(gamertagSlug) {
	check(gamertagSlug, String);
	var user = Meteor.users.findOne({ gamertagSlug: gamertagSlug });
	return userLeaderboards.find({ userId: user._id });
});

Meteor.publishComposite('userActivity', function(gamertagSlug) {
	check(gamertagSlug, String);
	return {
		find: function() {
			return Meteor.users.find({ gamertagSlug: gamertagSlug });
		},
		children: [
			{
				find: function(user) {
					return recentActivity.find({ userId: user._id }, {
						fields: {
							"userId": 1,
							"activityList": 1
						}
					});
				}
			}
		]
	}
});

// Meteor.publish('gameDetails', function(titleId) {
// 	return gameDetails.find({ gameId: titleId }, {
// 		fields: {
// 			"gameId": 1,
// 			"gameArt": 1
// 		}
// 	});
// });

Meteor.publishComposite('userAchievements', function(gamertagSlug) {
	check(gamertagSlug, String);
	return {
		find: function() {
			return Meteor.users.find({ gamertagSlug: gamertagSlug });
		},
		children: [
			{
				find: function(user) {
					return userAchievements.find({ userId: user._id }, {
						sort: { progression: -1 },
						limit: 6
					});
				},
				children: [
					{
						find: function(userAchievement, user) {
							return xbdAchievements.find({ _id: userAchievement.achievementId }, {
								fields: {
									"gameId": 1,
									"name": 1,
									"mediaAssets": 1,
									"value": 1,
									"slug": 1
								}
							});
						},
						children: [
							{
								find: function(xbdAchievement, userAchievement, user) {
									return xbdGames.find({ _id: xbdAchievement.gameId }, {
										fields: {
											"name": 1
										}
									});
								}
							}
						]
					}
				]
			}
		]
	}
});

Meteor.publishComposite('userGames', function(gamertagSlug) {
	check(gamertagSlug, String);
	return {
		find: function() {
			return Meteor.users.find({ gamertagSlug: gamertagSlug });
		},
		children: [
			{
				find: function(user) {
					return userGames.find({ userId: user._id, completed: true }, {
						fields: { 
							"gameId": 1,
							"userId": 1,
							"lastUnlock": 1,
							"completed": 1
						},
						sort: { "lastUnlock": -1 },
						limit: 7
					});
				},
				children: [
					{
						find: function(userGame, user) {
							return xbdGames.find({ _id: userGame.gameId }, {
								fields: {
									"platform": 1,
									"name": 1,
									"slug": 1
								}
							});
						},
						children: [
							{
								find: function(xbdGame, userGame, user) {
									return gameDetails.find({ gameId: userGame.gameId }, {
										fields: {
											"gameId": 1,
											"gameGenre": 1,
											"gameArt": 1
										}
									});
								}
							}
						]
					}
				]
			}
		]
	}
});

Meteor.publishComposite('userClips', function(gamertagSlug) {
	check(gamertagSlug, String);
	return {
		find: function() {
			return Meteor.users.find({ gamertagSlug: gamertagSlug });
		},
		children: [
			{
				find: function(user) {
					var currentTime = moment().format();
					return gameClips.find({ 
							"userId": user._id,
							"gameClipUris": {
								"uriType": {
									$in: [
										"Download"
									]
								}
							}
						}, {
						sort: { "datePublished": -1 },
						fields: {
							"datePublished": -1,
							"userId": 1,
							"titleId": 1,
							"titleName": 1,
							"thumbnails": 1,
							"gameClipUris": 1
						},
						limit: 6
					});
				}
			}
		]
	}
});

Meteor.publishComposite('userCaptures', function(gamertagSlug) {
	check(gamertagSlug, String);
	return {
		find: function() {
			return Meteor.users.find({ gamertagSlug: gamertagSlug });
		},
		children: [
			{
				find: function(user) {
					return screenShots.find({ userId: user._id }, {
						fields: {
							"userId": 1,
							"titleId": 1,
							"titleName": 1,
							"thumbnails": 1,
							"screenshotUris": 1
						},
						sort: { "datePublished": -1 },
						limit: 6
					});
				}
			}
		]
	}
});

Meteor.publishComposite('userBadges', function(gamertagSlug) {
	check(gamertagSlug, String);
	return {
		find: function() {
			return Meteor.users.find({ gamertagSlug: gamertagSlug });
		},
		children: [
			{
				find: function(user) {
					return xbdBadges.find({ userId: user._id });
				}
			}
		]
	}
});

Meteor.publishComposite('userWishlist', function(gamertagSlug) {
	check(gamertagSlug, String);
	return {
		find: function() {
			return Meteor.users.find({ gamertagSlug: gamertagSlug });
		},
		children: [
			{
				find: function(user) {
					return Wishlists.find({ userId: user._id });
				}
			}
		]
	}
});

Meteor.publishComposite('userTrophyCase', function(gamertagSlug) {
	check(gamertagSlug, String);
	return {
		find: function() {
			return Meteor.users.find({ gamertagSlug: gamertagSlug });
		},
		children: [
			{
				find: function(user) {
					return trophyCase.find({ userId: user._id });
				}
			}
		]
	}
});