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

Meteor.publishComposite('gamesByReleaseDate', {
	find: function() {
		Meteor._debug("fired game by releaese date");
		return gameDetails.find({}, {sort: {gameReleaseDate: -1}, limit: 50});
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

Meteor.publishComposite('topGamerscoreGames', {
	find: function() {
		var defaultLimit = 10;
		Meteor._debug("fired publish  game by gamerscore function");
		return xbdGames.find({}, {sort: {maxGamerscore: -1}, limit: 50});
	}, 
	children: [
		{
			find: function(game) {
				return gameDetails.find({gameId: game._id});
			}
		},
		{
			find: function(game) {
				if (!this.userId) {
					return;
				}
				return userGames.find({userId: this.userId});
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