SyncedCron.add({
	name: "non-optimistic update user leaderboard counts",
	schedule: function(parser) {
		return parser.text('every 40 mins');
	},
	job: function() {
		var users = Meteor.users.find({$or: [{'gamertagScanned.status': 'true'}, {'gamertagScanned.status': 'updating'}]});
		users.forEach(function(user) {
			console.log(user.gamertagScanned);
			leaderboardsApi.buildUserRanks(user._id);
			leaderboardsApi.updateUserCounts(user._id);
		});
		leaderboardsApi.updateUserRanks();
	}
});

SyncedCron.add({
	name: "optomistic update user leaderboard counts",
	schedule: function(parser) {
		return parser.text('every 20 min');
	},
	job: function() {
		var onlineUsers = Meteor.users.find({"status.online": true});
		onlineUsers.forEach(function(user) {
			if (!user.gamertagScanned || user.gamertagScanned.status === 'false' || user.gamertagScanned.status === 'building') {
				return;
			}

			//the buildUserRanks function will return and do nothing if the user already has a leaderboard doc. 
			leaderboardsApi.buildUserRanks(user._id);
			leaderboardsApi.updateUserCounts(user._id);
		});
		leaderboardsApi.updateUserRanks();
	}
});