Meteor.publish('userProfile', function(gamertagSlug) {
	check(gamertagSlug, String);
	return Meteor.users.find({ gamertagSlug: gamertagSlug }, {
		fields: {
			"services.twitter": 1,
			"emails": 1,
			"gamercard": 1,	
			"gamertagSlug": 1,
			"xboxProfile": 1,
			"presence": 1
		}
	});
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
						limit: 5
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

Meteor.publishComposite('userClips', function(gamertagSlug) {
	check(gamertagSlug, String);
	return {
		find: function() {
			return Meteor.users.find({ gamertagSlug: gamertagSlug });
		},
		children: [
			{
				find: function(user) {
					return gameClips.find({ userId: user._id }, {
						fields: {
							"userId": 1,
							"titleName": 1,
							"thumbnails": 1,
							"gameClipUris": 1
						}
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
							"titleName": 1,
							"thumbnails": 1,
							"screenshotUris": 1
						}
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