Meteor.publish('commentUserImage', function(userId) {
	check(userId, String);
	return Meteor.users.find({ _id: userId }, {
		fields: {
			"username": 1,
			"gamercard.gamerscore": 1,
			"gamercard.gamerpicLargeImagePath": 1
		}
	});
});

// games page publications

// router achievements / games publications

// Meteor.publishComposite('userAchievements', {
// 	find: function() {
// 		var user = Meteor.users.find({ _id: this.userId });
// 		if (!user) return;
// 		if (user) {
// 			if (user.gamertagScanned.status === 'false' || user.gamertagScanned.status === 'building') {
// 				return;
// 			}
// 		}
// 		if (!user.xuid) {
// 			Meteor._debug("no xuid");
// 			return;
// 		}
// 		return userAchievements.find({ userId: this.userId });
// 	},
// 	children: [
// 		{
// 			find: function(userAchievement) {
// 				return xbdAchievements.find({ _id: userAchievement.achievementId });
// 			}
// 		}
// 	]
// });

// Meteor.publishComposite('userGames', {
// 	find: function() {
// 		var user = Meteor.users.find({ _id: this.userId });
// 		if (!user) return;
// 		if (user) {
// 			if (user.gamertagScanned.status === 'false' || user.gamertagScanned.status === 'building') {
// 				return;
// 			}
// 		}
// 		if (!user.xuid) {
// 			Meteor._debug("no xuid");
// 			return;
// 		}
// 		return userGames.find({ userId: this.userId });
// 	},
// 	children: [
// 		{
// 			find: function(userGame) {
// 				return xbdGames.find({ _id: userGame.gameId })
// 			}
// 		},
// 		{
// 			find: function(userGame) {
// 				return gameDetails.find({ gameId: userGame.gameId });
// 			}
// 		}
// 	]
// });



// games details

// single pages

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