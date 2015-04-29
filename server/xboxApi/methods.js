Meteor.methods({
	testMethod: function() {
		Meteor._debug("test method firing");
	},
	setTwitterEmail: function(email) {
		Meteor._debug("email method firing");
		
		check(email, String);
		
		if (!email.match(/@/)) {
			throw new Meteor.Error("twtEmailError", "This email is not valid.");
		}

		var userId = Meteor.userId();

		var emails = [];
		emails[0] = {address: email, verified: false};

		Meteor.users.upsert({ _id: userId }, {$set: {emails: emails}});
		return;
	}
});