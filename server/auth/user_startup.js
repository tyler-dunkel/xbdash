// Meteor.startup(function() {
// 	// function to give users an overall rank according to gamerscore
// 	Meteor.setInterval(function() {
// 		var users = Meteor.users.find({ "profile.gamercard.gamerscore": { $gt: 1} }, { $sort: { "profile.gamercard.gamerscore": -1 } });
// 		var userOverallRank = 1;
		
// 		if (!users.count()) {
// 			Meteor._debug("there is no one signed up");
// 			return;
// 		}

// 		users.forEach(function(user) {
// 			Meteor._debug("user ID is: " + user._id);
// 			Meteor.users.upsert({ _id: user._id }, { $set: { "profile.userOverallRank": userOverallRank } });
// 			userOverallRank++;
// 		});
// 	}, 1000 * 1800);

// 	// function to count a users gamerscore gains for the day and creating a daily rank according to gamerscore
// 	Meteor.setInterval(function() {
// 		var users = Meteor.users.find({ "profile.gamercard.gamerscore": { $gt: 1 } });
// 		var oneDay = moment().startOf('day').toDate();

// 		if (!users.count()) {
// 			return;
// 		}

// 		//find each users gamerscore for the past 24 hours and put it into a field called userDailyGamerscore
// 		users.forEach(function(user){
// 			var userDailyAchievements = userAchievements.find({ userId: user._id, progressState: true, progression: { $gte: oneDay } });
// 			var userDailyGamerscore = 0;
// 			if (!userDailyAchievements.count()) {
// 				Meteor.users.upsert({ _id: user._id }, { $set: { "profile.userDailyGamerscore": userDailyGamerscore } });
// 				return;
// 			}
// 			userDailyAchievements.forEach(function(achievement) {
// 				Meteor._debug("achievement is here: " + achievement.achievementId);
// 				var singleAchievement = xbdAchievements.findOne(achievement.achievementId);
// 				//Meteor._debug(singleAchievement);
// 				Meteor._debug(singleAchievement.value);
// 				userDailyGamerscore += singleAchievement.value;
// 				//Meteor._debug(userDailyGamerscore);
// 			});
// 			Meteor.users.upsert({ _id: user._id }, { $set: { "profile.userDailyGamerscore": userDailyGamerscore } });
// 			Meteor._debug(count);
// 		});

// 		//find each user and assign them a daily rank based upon the above computed userDailyGamerscore
// 		var users = Meteor.users.find({ "profile.gamercard.gamerscore": { $gt: 1 } }, { $sort: { "profile.userDailyGamerscore": -1 } });
// 		var userOverallRank = 1;

// 		users.forEach(function(user){
// 			Meteor.users.upsert({ _id: user._id }, { $set: {"profile.userDailyRank": userDailyRank } });
// 			userDailyRank++;
// 		});
// 	}, 1000 * 86400);
// });