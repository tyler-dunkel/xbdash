var clearDailyRanksJob = new Job(xbdJobsCollection, 'clearDailyRanksJob', {})
.priority('normal')
.repeat({
	schedule: xbdJobsCollection.later.parse.text('at 12:00 am')
})
.save(function (err, result) {
	if (err) return;
	if (!err && result) {
		console.log('clear daily ranks job saved with ID: ' + result);
	}
});

var dirtyUserStatsJob = new Job(xbdJobsCollection, 'dirtyUserStatsJob', {})
.priority('normal')
.repeat({
	schedule: xbdJobsCollection.later.parse.text('every 2 hours')
})
.save(function (err, result) {
	if (err) return;
	if (!err && result) {
		console.log('dirty user stats job saved with ID: ' + result);
	}
});

var checkUserStatsJob = new Job(xbdJobsCollection, 'checkUserStatsJob', {})
.priority('normal')
.repeat({
	schedule: xbdJobsCollection.later.parse.text('every 2 hours')
})
.save(function (err, result) {
	if (err) return;
	if (!err && result) {
		console .log('new user stats update job saved with ID: ' + result);
	}
});

var checkGamesJob = new Job(xbdJobsCollection, 'checkGamesJob', {})
.priority('normal')
.repeat({
	schedule: xbdJobsCollection.later.parse.text('every 2 min')
})
.save(function (err, result) {
	if (err) return;
	if (!err && result) {
		console.log('new game completeness job saved with ID: ' + result);
	}
});

var checkLeaderboardsJob = new Job(xbdJobsCollection, 'checkLeaderboardsJob', {})
.priority('normal')
.repeat({
	schedule: xbdJobsCollection.later.parse.text('every 4 hours')
})
.save(function (err, result) {
	if (err) return;
	if (!err && result) {
		console.log('new leaderboards update job save with ID: ' + result);
	}
});

var checkAchievementsJob = new Job(xbdJobsCollection, 'checkAchievementsJob', {})
.priority('normal')
.repeat({
	schedule: xbdJobsCollection.later.parse.text('every 6 hours')
})
.save(function (err, result) {
	if (err) return;
	if (!err && result) {
		console.log('new achievement update job saved with ID: ' + result);
	}
});