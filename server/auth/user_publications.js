Meteor.publish('globalUserFields', function() {
	return Meteor.users.find({ _id: this.userId }, {
		fields: {
			"gamertagScanned": 1,
			"emails[0].address": 1,
			"emails[0].verified": 1,
			"services.facebook.name": 1,
			"services.twitter.screenName": 1,
			"services.twitter.profile_image_url_https": 1
		}
	});
});

Meteor.publish('userReferralInfo', function() {
	return Meteor.users.find({ _id: this.userId }, {
		fields: {
			"userSeenReferralBox": 1,
			"userReferralCount": 1
		}
	});
});

