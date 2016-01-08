SyncedCron.add({
	name: "update all user stats",
	schedule: function(parser) {
		return parser.text('every 6 hours');
	},
	job: function() {
		var users = meteor.users.find({ $or: [{ 'gamertagScanned.status': 'true' }, { 'gamertagScanned.status': 'updating' }] });
		if (users.count() < 1) return;
		users.forEach(function(user) {
			xboxApiObject.updateUserStats(user_id);
		});
	}
});