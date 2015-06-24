Meteor.publish('userSocialServices', function() {
	return Meteor.users.find({ _id: this.userId }, {
		fields: {
			"emails[0].address": 1,
			"services.facebook.name": 1,
			//"services.facebook.email": 1,
			"services.twitter.screenName": 1,
			"services.twitter.profile_image_url_https": 1
		}
	});
});

Meteor.publishComposite('rarestAchievements', {
	find: function() {
		Meteor._debug("rarest achievement function firing");
		return xbdAchievements.find({}, {sort: {userPercentage: -1}, limit: 18});
	},
	children: [
		{
			find: function(achievement) {
				if (!this.userId) {
					return;
				}
				var userAchievementCheck = userAchievements.find({userId: this.userId, achievementId: achievement._id});
				if (typeof userAchievementCheck !== 'undefined') {
					return userAchievementCheck;
				}
				return;
			}
		}
	]
});

Meteor.publishComposite('mostPopularAchievements', {
	find: function() {
		Meteor._debug("most popular achievement function firing");
		return xbdAchievements.find({}, {sort: {userPercentage: 1}, limit: 18});
	},
	children: [
		{
			find: function(achievement) {
				if (!this.userId) {
					return;
				}
				var userAchievementCheck = userAchievements.find({userId: this.userId, achievementId: achievement._id});
				if (typeof userAchievementCheck !== 'undefined') {
					return userAchievementCheck;
				}
				return;
			}
		}
	]
});

Meteor.publishComposite('gamesByReleaseDate', {
	find: function() {
		Meteor._debug("fired game by releaese date");
		return gameDetails.find({}, {sort: {gameReleaseDate: -1}, limit: 18});
	},
	children: [
		{
			find: function(game) {
				return xbdGames.find({_id: game.gameId});
			}
		},
		{
			find: function(game) {
				if (!this.userId) {
					return;
				}
				return userGames.find({gameId: game.gameId});
			}
		}
	]
});

Meteor.publishComposite('myTopGames', {
	find: function() {
		if (!this.userId) {
			Meteor._debug("fired publish  game by gamerscore function");
			return xbdGames.find({}, { sort: { maxGamerscore: -1 }, limit: 25 });
		}
		return userGames.find({}, { sort: { currentGamerscore: -1 }, limit: 25 });
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
				//Meteor._debug(game);
				return xbdGames.find({ _id: game.gameid });
			}
		}
	]
});

Meteor.publishComposite('userAchievements', {
	find: function() {
		if (!this.userId) {
			return;
		}
		var user = Meteor.users.findOne({ _id: this.userId });
		//Meteor._debug(user);
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
		if (!this.userId) {
			return;
		}
		var user = Meteor.users.findOne({ _id: this.userId });
		//Meteor._debug(user);
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

// global publications - general user