Meteor.publishComposite('mostPopularAchievements', {
	find: function() {
		Meteor._debug("most popular achievement function firing");
		return xbdAchievements.find({}, { sort: { userPercentage: 1 }, limit: 50 });
	},
	children: [
		{
			find: function(achievement) {
				var user = Meteor.users.findOne({ _id: this.userId });
				if (!user) return;
				if (!user.gamertagScanned) return;
				
				var userAchievementCheck = userAchievements.find({ userId: this.userId, achievementId: achievement._id });
				if (typeof userAchievementCheck !== 'undefined') {
					return userAchievementCheck;
				}
				return;
			}
		},
		{
			find: function(achievement) {
				return xbdGames.find({ _id: achievement.gameId });
			}
		}
	]
});

Meteor.publishComposite('rarestAchievements', {
	find: function() {
		Meteor._debug("rarest achievement function firing");
		return xbdAchievements.find({}, { sort: { userPercentage: -1 }, limit: 50 });
	},
	children: [
		{
			find: function(achievement) {
				var user = Meteor.users.findOne({ _id: this.userId });
				if (!user) return;
				if (!user.gamertagScanned) return;

				var userAchievementCheck = userAchievements.find({ userId: this.userId, achievementId: achievement._id });
				if (typeof userAchievementCheck !== 'undefined') {
					return userAchievementCheck;
				}
				return;
			}
		},
		{
			find: function(achievement) {
				return xbdGames.find({ _id: achievement.gameId });
			}
		}
	]
});

Meteor.publishComposite('singleAchievement', function(slug) {
	return {
		find: function() {
			Meteor._debug("this is the single achievement one");
			return xbdAchievements.find({ slug: slug });
		},
		children: [
			{
				find: function(achievement) {
					return xbdAchievements.find({ gameId: achievement.gameId });
				}
			},
			{
				find: function(achievement) {
					return xbdGames.find({ _id: achievement.gameId });
				}
			},
			{
				find: function(achievement) {
					if (this.userId) {
						return userAchievements.find({ achievementId: achievement._id, userId: this.userId });
					}
				}
			}
		]
	}
});