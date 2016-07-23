Meteor.startup(function() {
	Meteor.setInterval(function() {
		xbdContests.find({status: 'waiting'}).forEach(function(contest) {
			if (contest.startDate < new Date()) {
				xbdContests.update({_id: contest._id}, {$set: {status: 'active'}});
			}
		});
	}, 1000);
});