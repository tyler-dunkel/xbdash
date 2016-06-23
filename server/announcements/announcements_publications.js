Meteor.publish('xbdAnnouncements', function() {
	return xbdAnnouncements.find({});
});