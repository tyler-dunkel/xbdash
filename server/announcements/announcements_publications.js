Meteor.publish('xbdAnnouncements', function() {
	return xbdAnnouncements.find({}, {sort: {createdAt: -1}, limit: 5});
});