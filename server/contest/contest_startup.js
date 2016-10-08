Meteor.startup(function() {
	Meteor.setInterval(function() {
		xbdContests.find({ status: 'waiting'}).forEach(function(contest) {
			if (contest.startDate > moment.utc().toDate()) {
				xbdContests.update({_id: contest._id }, { $set: { status: 'active' } });
			}
		});
	}, 1000);

	//check for active contests that need to end. if ending, set to choosing winner and create a job to do a scan. 
	Meteor.setInterval(function() {
		xbdContests.find({ status: 'active'}).forEach(function(contest) {
			if (contest.endDate < moment.utc().toDate()) {
				xbdContests.update({_id: contest._id }, { $set: { status: 'choosing-winner' } });
				userContestEntries.update({contestToken: contest.contestToken}, { $set: { status: 'choosing-winner' } });
				var chooseContestWinner = new Job(xbdJobsCollection, 'chooseContestWinner', { contestToken: contest.contestToken })
					.priority('high')
					.save(function (err, result) {
						if (err) return;
						if (!err && result) {
							console.log('building user profile');
						}
					});
			}
		});
	}, 1000);
});