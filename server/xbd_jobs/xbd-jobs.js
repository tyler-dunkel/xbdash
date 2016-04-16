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

// var dirtyUserStatsJob = new Job(xbdJobsCollection, 'dirtyUserStatsJob', {})
// .priority('normal')
// .repeat({
// 	schedule: xbdJobsCollection.later.parse.text('every 30 mins')
// })
// .save(function (err, result) {
// 	if (err) return;
// 	if (!err && result) {
// 		console.log('dirty user stats job saved with ID: ' + result);
// 	}
// });