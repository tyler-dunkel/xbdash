//server
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
	}, 250000);

	//function to give users an overall rank according to gamerscore
	Meteor.setInterval(function() {
		var users = Meteor.users.find({"profile.gamercard.gamerscore": {$gt: 1}}, {$sort: {"profile.gamercard.gamerscore": -1}});
		var userOverallRank = 1;
		if (!users.count()) {
			Meteor._debug("there is no one signed up");
			return;
		}
		users.forEach(function(user) {
			Meteor._debug("user ID is: " + user._id);
			Meteor.users.upsert({_id: user._id}, {$set: {"profile.userOverallRank": userOverallRank}});
			userOverallRank++;
		});

	}, 50000);

	//function to count a users gamerscore gains for the day and creating a daily rank according to gamerscore
	Meteor.setInterval(function() {
		var count = 0;
		var users = Meteor.users.find({"profile.gamercard.gamerscore": {$gt: 1}});
		var oneDay = moment().startOf('day').toDate();

		//find each users gamerscore for the past 24 hours and put it into a field called userDailyGamerscore
		users.forEach(function(user){
			var userDailyAchievements = userAchievements.find({userId: user._id, progressState: true, progression: {$gte: oneDay}});
			if (!userDailyAchievements.count()) {
				Meteor._debug("this guys a fool and hasnt achieved anything today");
				return;
			}
			var userDailyGamerscore = 0;
			userDailyAchievements.forEach(function(achievement) {
				count++;
				Meteor._debug("achievement is here: " + achievement.achievementId);
				var singleAchievement = xbdAchievements.findOne(achievement.achievementId);
				//Meteor._debug(singleAchievement);
				Meteor._debug(singleAchievement.value);
				userDailyGamerscore += singleAchievement.value;
				//Meteor._debug(userDailyGamerscore);
			});
			Meteor.users.upsert({_id: user._id}, {$set: {"profile.userDailyGamerscore": userDailyGamerscore}});
			Meteor._debug(count);
		});

		//find each user and assign them a daily rank based upon the above computed userDailyGamerscore
		var users = Meteor.users.find({"profile.gamercard.gamerscore": {$gt: 1}}, {$sort: {"profile.userDailyGamerscore": -1}});
		var userDailyRank = 1;
		users.forEach(function(user){
			Meteor.users.upsert({_id: user._id}, {$set: {"profile.userDailyRank": userDailyRank}});
			userDailyRank++;
		});
	}, 50000);

});

UserStatus.events.on("connectionLogin", function(fields) {
	
});

UserStatus.events.on("connectionLogout", function(fields) {
	
});

process.env.MAIL_URL="smtp://xboxdashbugreporter%40gmail.com:theskyisblue@smtp.gmail.com:465/";
Meteor.methods({
	contactUsEmail: function(name, email, subject, text) {
		Email.send({
			from: "xboxdashbugreporter@gmail.com",
			to: "kguirao87@gmail.com",
			subject: subject,
			text: text
		});
	}
});