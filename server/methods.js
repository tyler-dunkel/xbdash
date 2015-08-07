Meteor.methods({
	setTwitterEmail: function(email) {
		Meteor._debug("email method firing");
		
		check(email, String);
		
		if (!email.match(/@/)) {
			throw new Meteor.Error("twtEmailError", "This email is not valid.");
		}

		var userId = Meteor.userId();
		var emails = [];
		emails[0] = {address: email, verified: false};

		Meteor.users.upsert({ _id: userId }, { $set: { emails: emails } });
		return;
	}
});

Meteor.methods({
	contactUsEmail: function(name, email, subject, text) {
		Email.send({
			//from: "XBdash <bugs@xbdash.com>",
			from: "XBdash <xboxdashbugreporter@gmail.com>",
			to: "kguirao87@gmail.com",
			subject: subject,
			text: text
		});
	}
});