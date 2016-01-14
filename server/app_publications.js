Meteor.publish('commentUserImage', function(userId) {
	check(userId, String);
	return Meteor.users.find({ _id: userId }, {
		fields: {
			"username": 1,
			"gamercard.gamerscore": 1,
			"gamercard.gamerpicLargeSslImagePath": 1
		}
	});
});