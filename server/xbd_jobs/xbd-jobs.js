var checkGamesJob = new Job(xbdJobsCollection, 'checkGamesJob', {
})
.priority('normal')
.save(function (err, result) {
	if (err) return;
	if (!err && result) {
		console.log('new user update job saved with ID: ' + result);
	}
});

var checkAchievementsJob = new Job(xbdJobsCollection, 'checkAchievementsJob', {
})
.priority('normal')
.save(function (err, result) {
	if (err) return;
	if (!err && result) {
		console.log('new achievement update job saved with ID: ' + result);
	}
});