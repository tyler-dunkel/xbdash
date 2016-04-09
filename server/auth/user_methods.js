Meteor.methods({
	setTwitterEmail: function(email) {
		check(email, String);
		
		if (!email.match(/@/)) {
			throw new Meteor.Error("twtEmailError", "This email is not valid.");
		}

		var userId = Meteor.userId();
		var emails = [];
		emails[0] = {address: email, verified: false};

		Meteor.users.upsert({ _id: userId }, { $set: { emails: emails } });

		return;
	},
	contactUsEmail: function(name, email, subject, text) {
		check([name, subject, text], [String]);

		Email.send({
			to: "kguirao87@gmail.com",
			from: "XBdash <contact@email.xbdash.com>",
			subject: subject,
			text: name + '<br />' + email + '<br />' + text
		});

		return;
	}
	// deleteUser: function () {
	// 	var user = Meteor.user();
	// 	userAchievements.remove({ userId: user._id });
	// 	userGames.remove({ userId: user._id });
	// 	userLeaderboards.remove({userId: user._id});
	// 	Meteor.users.remove({ _id: user._id });
	// }
});