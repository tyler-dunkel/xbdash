Meteor.publish('userProfile', function(gamertagSlug) {
	check(gamertagSlug, String);
	return Meteor.users.find({ gamertagSlug: gamertagSlug }, {
		fields: {
			"services.twitter.screenName": 1,
			"emails": 1,
			"gamercard": 1,
			"xboxProfile": 1,
			"presence": 1
		}
	});
});