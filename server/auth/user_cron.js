// SyncedCron.add({
// 	name: "update all user stats",
// 	schedule: function(parser) {
// 		return parser.text('every 2 hours');
// 	},
// 	job: function() {
// 		var users = Meteor.users.find({ $or: [{ 'gamertagScanned.status': 'true' }, { 'gamertagScanned.status': 'updating' }] });
// 		if (users.count() < 1) return;
// 		users.forEach(function(user) {
// 			xboxApiObject.updateUserStats(user._id);
// 		});
// 	}
// });