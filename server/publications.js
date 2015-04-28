Meteor.publish('userSocialServices', function() {
	return Meteor.find({ _id: this.userId }, {
		fields: {
			"services.facebook.email": 1
		}
	});
});