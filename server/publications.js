Meteor.publish('globalUserFields', function() {
	return Meteor.users.find({ _id: this.userId }, {
		fields: {
			"gamertagScanned": 1,
			"emails[0].address": 1,
			"emails[0].verified": 1,
			"services.facebook.name": 1,
			"services.twitter.screenName": 1,
			"services.twitter.profile_image_url_https": 1
		}
	});
});

Meteor.publish('userReferralInfo', function() {
	return Meteor.users.find({ _id: this.userId }, {
		fields: {
			"userSeenReferralBox": 1,
			"userReferralCount": 1
		}
	});
});

Meteor.publish('commentUserImage', function(userId) {
	Meteor._debug(userId);
	return Meteor.users.find({ _id: userId }, {
		fields: {
			"username": 1,
			"profile.gamercard.gamerscore": 1,
			"profile.gamercard.gamerpicLargeImagePath": 1
		}
	});
});

// players by achievements completed
// players by achievement completion ratio
// players by games completed
// players by game completion ratio

/*

Meteor.publishComposite('achievementsCompletedLB', {
	find: function() {
		Meteor._debug("players by achievements completed");
		var achievementsLB = [
            {
                $group: {
                    _id: "$userId",
                    progressState: {
                        $sum: true
                    }
                }
            }
        ]
        return userAchievements.aggregate(achievementsLB);
		//return userAchievements.find({}, { sort: { progressState: 1 }, limit: 100 }); 
		return userAchievements.aggregate([
			{
		        $group: {
		        	_id: "$userId",
		            progressState: {
		                $sum: true
		            }
		        }
		    },
		    {
		    	$sort : {
		    		progressState: -1
		    	}
		    }
		]);
	}
});

Meteor.publishComposite('achievementsRatioLB', {
});

Meteor.publishComposite('gamesCompletedLB', {
});

Meteor.publishComposite('gamesRatioLB', {
});

*/

// achievements page publications

Meteor.publishComposite('mostPopularAchievements', {
	find: function() {
		Meteor._debug("most popular achievement function firing");
		return xbdAchievements.find({}, { sort: { userPercentage: 1 }, limit: 50 });
	},
	children: [
		{
			find: function(achievement) {
				if (!this.userId) {
					return;
				}
				var userAchievementCheck = userAchievements.find({ userId: this.userId, achievementId: achievement._id });
				if (typeof userAchievementCheck !== 'undefined') {
					return userAchievementCheck;
				}
				return;
			}
		},
		{
			find: function(achievement) {
				return xbdGames.find({ _id: achievement.gameId });
			}
		}
	]
});

Meteor.publishComposite('rarestAchievements', {
	find: function() {
		Meteor._debug("rarest achievement function firing");
		return xbdAchievements.find({}, { sort: { userPercentage: -1 }, limit: 50 });
	},
	children: [
		{
			find: function(achievement) {
				if (!this.userId) {
					return;
				}
				var userAchievementCheck = userAchievements.find({ userId: this.userId, achievementId: achievement._id });
				if (typeof userAchievementCheck !== 'undefined') {
					return userAchievementCheck;
				}
				return;
			}
		},
		{
			find: function(achievement) {
				return xbdGames.find({ _id: achievement.gameId });
			}
		}
	]
});

// games page publications

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

// router achievements / games publications

Meteor.publishComposite('userAchievements', {
	find: function() {
		var user = Meteor.users.findOne({ _id: this.userId });
		if (!this.userId || !user.gamertagScanned) {
			return;
		}
		if (!user.profile.xuid) {
			Meteor._debug("no xuid");
			return;
		}
		return userAchievements.find({ userId: this.userId });
	},
	children: [
		{
			find: function(userAchievement) {
				return xbdAchievements.find({ _id: userAchievement.achievementId });
			}
		}
	]
});

Meteor.publishComposite('userGames', {
	find: function() {
		var user = Meteor.users.findOne({ _id: this.userId });
		if (!this.userId || !user.gamertagScanned) {
			return;
		}
		if (!user.profile.xuid) {
			Meteor._debug("no xuid");
			return;
		}
		return userGames.find({ userId: this.userId });
	},
	children: [
		{
			find: function(userGame) {
				return xbdGames.find({ _id: userGame.gameId })
			}
		},
		{
			find: function(userGame) {
				return gameDetails.find({ gameId: userGame.gameId });
			}
		}
	]
});

// feed

Meteor.publish('latestNews', function() {
	return newsPolygon.find({});
});

// games details

Meteor.publish('gameDetails', function(id) {
	Meteor._debug(id);
	return gameDetails.find({ gameId: id });
});

// single pages

Meteor.publish('singleNews', function(id) {
	return newsPolygon.find({ id: id });
});

Meteor.publishComposite('singleAchievement', function(slug) {
	return {
		find: function() {
			Meteor._debug("this is the single achievement one");
			return xbdAchievements.find({ slug: slug });
		},
		children: [
			{
				find: function(achievement) {
					return xbdAchievements.find({ gameId: achievement.gameId });
				}
			},
			{
				find: function(achievement) {
					return xbdGames.find({ _id: achievement.gameId });
				}
			},
			{
				find: function(achievement) {
					if (this.userId) {
						return userAchievements.find({ achievementId: achievement._id, userId: this.userId });
					}
				}
			}
		]
	}
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

Meteor.publish('completedAchievements', function() {
	self = this;
	completedAchievements = userAchievements.aggregate([
		{
			$match: {
				progressState: true
			}
		},
		{
			$group: {
				_id: "$userId",
				achievementCount: { $sum: 1 }
			}
		}
	]);
	Meteor._debug(completedAchievements);
	_.each(completedAchievements, function(completedAchievement) {
		var user = Meteor.users.findOne({ _id: completedAchievement._id });
		var userGamertag = user.profile.gamercard.gamertag;
		var userPicture = user.profile.gamercard.gamerpicLargeSslImagePath;
		Meteor._debug(userGamertag);
		Meteor._debug(userPicture);
		self.added('completedachievements', userGamertag, {
			userPicture: userPicture,
			achievementCount: completedAchievement.achievementCount
		});
	});
	self.ready();
});

Meteor.publish('completedGames', function() {

});

// {_id: 3245gjrgj435 (this is userId), unlockedAchievements: 3444 (this is the sum of the unlocked acheivements from the aggregate)

// var achievementsCount = userAchievements.find({ progressState: true }).count();
// numberFormatter(achievementsCount);

// top 100 by total achievements (count) // topPlayersCompletedAchievements
// top 100 by total games completed // topPlayersCompletedGames
// top 100 by user gamerscore // topPlayersGamerscore
// top 100 by achievements unlocked-to-locked ratio // topPlayersAchievementRatio

// all time vs 30 day

// achievement pagination of 20/page by 5 pages

// global publications - general user