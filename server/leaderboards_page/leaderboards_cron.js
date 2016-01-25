// SyncedCron.add({
// 	name: "non-optimistic update user leaderboard counts",
// 	schedule: function(parser) {
// 		return parser.text('every 20 min');
// 	},
// 	job: function() {
// 		var users = Meteor.users.find({ $or: [{ 'gamertagScanned.status': 'true' }, { 'gamertagScanned.status': 'updating' }] });
// 		users.forEach(function(user) {
// 			leaderboardsApi.buildUserRanks(user._id);
// 			leaderboardsApi.updateUserCounts(user._id);
// 		});
// 		leaderboardsApi.updateUserRanks();
// 	}
// });

// SyncedCron.add({
// 	name: "clear user leaderboard daily ranks",
// 	schedule: function(parser) {
// 		return parser.text('at 12:00 am');
// 	},
// 	job: function() {
// 		userLeaderboards.update({}, { $set: { 'dailyRank.value': 0, 'dailyRank.rank': 0 } }, { multi: true });
// 	}
// });