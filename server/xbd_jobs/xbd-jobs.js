// var clearDailyRanksJob = new Job(xbdJobsCollection, 'clearDailyRanksJob', {})
// .priority('normal')
// .repeat({
// 	schedule: xbdJobsCollection.later.parse.text('at 12:00 am')
// })
// .save(function (err, result) {
// 	if (err) return;
// 	if (!err && result) {
// 		console.log('clear daily ranks job saved with ID: ' + result);
// 	}
// });

var dirtyUserStatsJob = new Job(xbdJobsCollection, 'dirtyStatJob', {})
.priority('normal')
.repeat({
	// schedule: xbdJobsCollection.later.parse.text('every 30 mins')
	schedule: xbdJobsCollection.later.parse.text('every 2 mins')
})
.save(function (err, result) {
	if (err) return;
	if (!err && result) {
		console.log('dirty user stats job saved with ID: ' + result);
	}
});

// var checkUserStatsJob = new Job(xbdJobsCollection, 'checkUserStatsJob', {})
// .priority('normal')
// .repeat({
// 	schedule: xbdJobsCollection.later.parse.text('every 2 hours')
// })
// .save(function (err, result) {
// 	if (err) return;
// 	if (!err && result) {
// 		console .log('new user stats update job saved with ID: ' + result);
// 	}
// });
