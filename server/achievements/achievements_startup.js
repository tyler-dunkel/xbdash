Meteor.startup(function() {
	//function to find the  achievements
	//tiering function for achievements
	//set internval function ->query for every site user and count the query -> query for every xbdAchievement -> loop through each xbdAchievement -> query the userAchievement table with the xbdAchievement _id and count the returned records (can either be unlocked, locked, or both) -> divide this count by the total user number we got earlier and store the resulting value within the xbdAchievement. 
	Meteor.setInterval(function() {
		var userCount = Meteor.users.find({"profile.xuid": {$exists: true}}).count();
		Meteor._debug("the user count is: " + userCount);
		var achievements = xbdAchievements.find({});

		achievements.forEach(function(achievement) {
			userAchievementCount = userAchievements.find({achievementId: achievement._id, progressState: true}).count();
			//Meteor._debug("the uesr achievement count is: " + userAchievementCount);
			achievementUnlockPercentage = Math.round((userAchievementCount / userCount)) * 100;
			//Meteor._debug(achievementUnlockPercentage);
			xbdAchievements.upsert({_id: achievement._id}, {$set: {userPercentage: achievementUnlockPercentage}});
		});
	}, 300000);
});