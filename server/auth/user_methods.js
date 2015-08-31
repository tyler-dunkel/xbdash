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
	},
	contactUsEmail: function(name, email, subject, text) {
		check([name, subject, text], [String]);

		Mandrill.messages.send({
			from_email: "contact@xbdash.com",
			from_name: "XBdash",
			to: "kguirao87@gmail.com",
			subject: subject,
			text: text
		});
		return;
	},
	deleteUser: function () {
		var user = Meteor.user();
		userAchievements.remove({ userId: user._id });
		userGames.remove({ userId: user._id });
		Meteor.users.remove({ _id: user._id });
	},
	userReferred: function(user, referrerId) {
		var referee = Meteor.users.findOne({"emails.address": user.email});
		check(referrerId, String);
		var referrer = Meteor.users.findOne({_id: referrerId});
		userReferrals.insert({ referrerId: referrerId, refereeId: referee._id, verified: false });
	},
	userReferredSocialSignup: function(refereeId, referrerId) {
		check(referrerId, String);
		check(refereeId, String);
		userReferrals.insert({ referrerId: referrerId, refereeId: refereeId, verified: true });
	},
	referralEmail: function(email1, subject, text) {
		Mandrill.messages.send({
			from: "XBdash <contact@xbdash.com>",
			//from: "XBdash <xboxdashbugreporter@gmail.com>",
			to: email1,
			subject: subject,
			text: text
		});
	},
	userHasSeenReferralBox: function() {
		this.unblock();
		var user = Meteor.user();
		Meteor.users.upsert({ _id: user._id }, { $set: {userSeenReferralBox: true }});
	}
});