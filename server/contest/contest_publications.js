Meteor.publish('xbdContestsPub', function() {
	return xbdContests.find({ "status": "active" });
});