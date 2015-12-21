SyncedCron.add({
	name: "optomistic update user data",
	schedule: function(parser) {
		return parser.text('every 15 min');
	},
	job: function() {
		var users = Meteor.users.find({"status.online": true});
		Meteor._debug("user function firing");
		if (!users.count()) {
			Meteor._debug("there are no users online currently");
			return;
		}
		users.forEach(function(user) {
			xboxApiObject.dirtyUpdateUserStats(user._id);
		});
	}
});

SyncedCron.add({
	name: "update online user data",
	schedule: function(parser) {
		return parser.text('every 2 hours');
	},
	job: function() {
		var users = Meteor.users.find({"status.online": true});
		if (users.count() < 1) return;
		users.forEach(function(user) {
			xboxApiObject.updateUserStats(user._id);
		});
	}
});

SyncedCron.add({
	name: "update all user stats",
	schedule: function(parser) {
		return parser.text('every 5 hours');
	},
	job: function() {
		var users = meteor.users.find({$or: [{'gamertagScanned.status': 'true'}, {'gamertagScanned.status': 'updating'}]});
		if (users.count() < 1) return;
		users.forEach(function(user) {
			xboxApiObject.updateUserStats(user_id);
		});
	}
});

// Meteor.startup(function() {
// 	// function to give users an overall rank according to gamerscore
// 	Meteor.setInterval(function() {
// 		var users = Meteor.users.find({ "gamercard.gamerscore": { $gt: 1} }, { $sort: { "gamercard.gamerscore": -1 } });
// 		var userOverallRank = 1;
		
// 		if (!users.count()) {
// 			Meteor._debug("there is no one signed up");
// 			return;
// 		}

// 		users.forEach(function(user) {
// 			Meteor._debug("user ID is: " + user._id);
// 			Meteor.users.upsert({ _id: user._id }, { $set: { "userOverallRank": userOverallRank } });
// 			userOverallRank++;
// 		});
// 	}, 1000 * 1800);

// 	// function to count a users gamerscore gains for the day and creating a daily rank according to gamerscore
// 	Meteor.setInterval(function() {
// 		var users = Meteor.users.find({ "gamercard.gamerscore": { $gt: 1 } });
// 		var oneDay = moment().startOf('day').toDate();

// 		if (!users.count()) {
// 			return;
// 		}

// 		//find each users gamerscore for the past 24 hours and put it into a field called userDailyGamerscore
// 		users.forEach(function(user){
// 			var userDailyAchievements = userAchievements.find({ userId: user._id, progressState: true, progression: { $gte: oneDay } });
// 			var userDailyGamerscore = 0;
// 			if (!userDailyAchievements.count()) {
// 				Meteor.users.upsert({ _id: user._id }, { $set: { "userDailyGamerscore": userDailyGamerscore } });
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
// 			Meteor.users.upsert({ _id: user._id }, { $set: { "userDailyGamerscore": userDailyGamerscore } });
// 			Meteor._debug(count);
// 		});

// 		//find each user and assign them a daily rank based upon the above computed userDailyGamerscore
// 		var users = Meteor.users.find({ "gamercard.gamerscore": { $gt: 1 } }, { $sort: { "userDailyGamerscore": -1 } });
// 		var userOverallRank = 1;

// 		users.forEach(function(user){
// 			Meteor.users.upsert({ _id: user._id }, { $set: { userDailyRank: userDailyRank } });
// 			userDailyRank++;
// 		});
// 	}, 1000 * 86400);
// });