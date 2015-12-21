SyncedCron.add({
	name: "achievement user percentage job",
	schedule: function(parser) {
		return parser.text('every 1 hour');
	},
	job: function() {
		var userCount = Meteor.users.find({ xuid: { $exists: true } }).count();
		Meteor._debug("the user count is: " + userCount);
		var achievements = xbdAchievements.find({});

		achievements.forEach(function(achievement) {
			userAchievementCount = userAchievements.find({ achievementId: achievement._id, progressState: true }).count();
			// Meteor._debug(userAchievementCount);
			achievementUnlockPercentage = (userAchievementCount / userCount) * 100;
			xbdAchievements.upsert({ _id: achievement._id }, { $set: { userPercentage: achievementUnlockPercentage } });
		});
	}
});



Meteor.startup(function() {
	//function to find the  achievements
	//tiering function for achievements
	//set internval function ->query for every site user and count the query -> query for every xbdAchievement -> loop through each xbdAchievement -> query the userAchievement table with the xbdAchievement _id and count the returned records (can either be unlocked, locked, or both) -> divide this count by the total user number we got earlier and store the resulting value within the xbdAchievement. 
	// Meteor.setInterval(function() {
	// 	var userCount = Meteor.users.find({ xuid: { $exists: true } }).count();
	// 	Meteor._debug("the user count is: " + userCount);
	// 	var achievements = xbdAchievements.find({});

	// 	achievements.forEach(function(achievement) {
	// 		userAchievementCount = userAchievements.find({ achievementId: achievement._id, progressState: true }).count();
	// 		// Meteor._debug(userAchievementCount);
	// 		achievementUnlockPercentage = (userAchievementCount / userCount) * 100;
	// 		xbdAchievements.upsert({ _id: achievement._id }, { $set: { userPercentage: achievementUnlockPercentage } });
	// 	});
	// }, 300000);
	// }, 5000);
});