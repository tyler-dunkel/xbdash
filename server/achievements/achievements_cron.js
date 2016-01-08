SyncedCron.add({
	name: "achievement user percentage job",
	schedule: function(parser) {
		return parser.text('every 2 hours');
	},
	job: function() {
		var userCount = Meteor.users.find({ xuid: { $exists: true } }).count();
		var achievements = xbdAchievements.find({});
		
		achievements.forEach(function(achievement) {
			userAchievementCount = userAchievements.find({ achievementId: achievement._id, progressState: true }).count();
			achievementUnlockPercentage = Math.round((userAchievementCount/userCount) * 100);
			xbdAchievements.upsert({ _id: achievement._id }, { $set: { userPercentage: achievementUnlockPercentage } });
		});
	}
});