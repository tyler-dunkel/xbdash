Meteor.publish('completedAchievements', function() {
	var self = this;
	var completedAchievements = userAchievements.aggregate([
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
	var rank = 0;
	Meteor._debug(completedAchievements);
	_.each(completedAchievements, function(completedAchievement) {
		rank++;
		var user = Meteor.users.findOne({ _id: completedAchievement._id });
		var userGamertag = user.profile.gamercard.gamertag;
		var userPicture = user.profile.gamercard.gamerpicLargeImagePath;
		self.added('completedachievements', userGamertag, {
			userPicture: userPicture,
			achievementCount: completedAchievement.achievementCount,
			rank: rank
		});
	});
	self.ready();
});

Meteor.publish('completedGames', function() {
	var self = this;
	var completedGames = userGames.aggregate([
		{
			$match: {
				completed: true
			}
		},
		{
			$group: {
				_id: "$userId",
				gameCount: { $sum: 1 }
			}
		}
	]);
	var rank = 0;
	Meteor._debug(completedGames);
	_.each(completedGames, function(completedGame) {
		rank++;
		var user = Meteor.users.findOne({ _id: completedGame._id });
		var userGamertag = user.profile.gamercard.gamertag;
		var userPicture = user.profile.gamercard.gamerpicLargeImagePath;
		self.added('completedgames', userGamertag, {
			userPicture: userPicture,
			gameCount: completedGame.gameCount,
			rank: rank
		});
	});
	self.ready();
});

Meteor.publish('maxGamerscore', function() {
	return usersByGamerscore = Meteor.users.find({}, {
		$sort: { "profile.gamercard.gamerscore": -1 },
		fields: {
			"profile.gamercard.gamertag": 1,
			"profile.gamercard.gamerscore": 1,
			"profile.gamercard.gamerpicLargeImagePath": 1,
			"profile.userOverallRank": 1
		},
		limit: 100
	});
});