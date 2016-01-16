SyncedCron.add({
	name: "update user percentage for acheivements a-e",
	schedule: function(parser) {
		return parser.text('every 4 hours');
	},
	job: function() {
		var userCount = Meteor.users.find({ xuid: { $exists: true } }).count();
		var achievements = xbdAchievements.find({ "name": /^[a-e]/ });

		achievements.forEach(function(achievement) {
			userAchievementCount = userAchievements.find({ achievementId: achievement._id, progressState: true }).count();
			achievementUnlockPercentage = Math.round((userAchievementCount/userCount) * 100);
			xbdAchievements.upsert({ _id: achievement._id }, { $set: { userPercentage: achievementUnlockPercentage } });
		});
	}
});

SyncedCron.add({
	name: "update user percentage for acheivements f-j",
	schedule: function(parser) {
		return parser.text('every 5 hours');
	},
	job: function() {
		var userCount = Meteor.users.find({ xuid: { $exists: true } }).count();
		var achievements = xbdAchievements.find({ "name": /^[f-j]/ });
		
		achievements.forEach(function(achievement) {
			userAchievementCount = userAchievements.find({ achievementId: achievement._id, progressState: true }).count();
			achievementUnlockPercentage = Math.round((userAchievementCount/userCount) * 100);
			xbdAchievements.upsert({ _id: achievement._id }, { $set: { userPercentage: achievementUnlockPercentage } });
		});
	}
});

SyncedCron.add({
	name: "update user percentage for acheivements k-o",
	schedule: function(parser) {
		return parser.text('every 4 hours');
	},
	job: function() {
		var userCount = Meteor.users.find({ xuid: { $exists: true } }).count();
		var achievements = xbdAchievements.find({ "name": /^[k-o]/ });

		achievements.forEach(function(achievement) {
			userAchievementCount = userAchievements.find({ achievementId: achievement._id, progressState: true }).count();
			achievementUnlockPercentage = Math.round((userAchievementCount/userCount) * 100);
			xbdAchievements.upsert({ _id: achievement._id }, { $set: { userPercentage: achievementUnlockPercentage } });
		});
	}
});

SyncedCron.add({
	name: "update user percentage for acheivements p-t",
	schedule: function(parser) {
		return parser.text('every 5 hours');
	},
	job: function() {
		var userCount = Meteor.users.find({ xuid: { $exists: true } }).count();
		var achievements = xbdAchievements.find({ "name": /^[p-t]/ });
		
		achievements.forEach(function(achievement) {
			userAchievementCount = userAchievements.find({ achievementId: achievement._id, progressState: true }).count();
			achievementUnlockPercentage = Math.round((userAchievementCount/userCount) * 100);
			xbdAchievements.upsert({ _id: achievement._id }, { $set: { userPercentage: achievementUnlockPercentage } });
		});
	}
});

SyncedCron.add({
	name: "update user percentage for acheivements u-z",
	schedule: function(parser) {
		return parser.text('every 6 hours');
	},
	job: function() {
		var userCount = Meteor.users.find({ xuid: { $exists: true } }).count();
		var achievements = xbdAchievements.find({ "name": /^[u-z]/ });
		
		achievements.forEach(function(achievement) {
			userAchievementCount = userAchievements.find({ achievementId: achievement._id, progressState: true }).count();
			achievementUnlockPercentage = Math.round((userAchievementCount/userCount) * 100);
			xbdAchievements.upsert({ _id: achievement._id }, { $set: { userPercentage: achievementUnlockPercentage } });
		});
	}
});

SyncedCron.add({
	name: "updating achievements with 0 user percent",
	schedule: function(parser) {
		return parser.text('every 30 min');
	},
	job: function() {
		var userCount = Meteor.users.find({ xuid: { $exists: true } }).count();
		var achievements = xbdAchievements.find({ "userPercentage": 0 }, { limit: 500 });
		
		achievements.forEach(function(achievement) {
			userAchievementCount = userAchievements.find({ achievementId: achievement._id, progressState: true }).count();
			achievementUnlockPercentage = Math.round((userAchievementCount/userCount) * 100);
			xbdAchievements.upsert({ _id: achievement._id }, { $set: { userPercentage: achievementUnlockPercentage } });
		});
	}
});