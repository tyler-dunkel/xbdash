var clearDailyRanksWorker = xbdJobsCollection.processJobs('clearDailyRanksJob', {}, function (job, callback) {
	if (job) {
		userLeaderboards.update({}, { $set: { 'dailyRank.value': 0, 'dailyRank.rank': 0 } }, { multi: true });
		job.done();
		callback();
	}
});

var dirtyUserStatsWorker = xbdJobsCollection.processJobs('dirtyUserStatsJob', {}, function (job, callback) {
	if (job) {
		var users = Meteor.users.find({ $or: [{ 'gamertagScanned.status': 'true' }, { 'gamertagScanned.status': 'updating' }] }, { sort: { 'gamertagScanned.lastUpdate': 1 }, limit: 25 });
		if (users.count() < 1) {
			job.done();
			callback();
		}
		users.forEach(function(user) {
			console.log('updating dirty: ' + user.gamercard.gamertag);
			xboxApiObject.dirtyUpdateUserStats(user._id);
		});
		job.done();
		callback();
	}
});

// var userStatsWorker = xbdJobsCollection.processJobs('checkUserStatsJob', {}, function (job, callback) {
// 	if (job) {
// 		var users = Meteor.users.find({ $or: [{ 'gamertagScanned.status': 'true' }, { 'gamertagScanned.status': 'updating' }] }, { sort: { 'gamertagScanned.lastUpdate': 1 }, limit: 5 });
// 		if (users.count() < 1) {
// 			job.done();
// 			callback();
// 		}
// 		users.forEach(function(user) {
// 			xboxApiObject.updateUserStats(user._id);
// 		});
// 		job.done();
// 		callback();
// 	}
// });

var checkLeaderboardsWorker = xbdJobsCollection.processJobs('checkLeaderboardsJob', {}, function (job, callback) {
	if (job) {
		var users = Meteor.users.find({ $or: [{ 'gamertagScanned.status': 'true' }, { 'gamertagScanned.status': 'updating' }] }, { sort: { 'gamertagScanned.lastUpdate': 1 }, limit: 50 });
		users.forEach(function(user) {
			leaderboardsApi.buildUserRanks(user._id);
			leaderboardsApi.updateUserCounts(user._id);
		});
		leaderboardsApi.updateUserRanks();
		job.done();
		callback();
	}
});