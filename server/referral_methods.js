Meteor.startup(function() {
	var userId = Meteor.users.findOne({})._id;
	for(var i=0; i < 10; i++) {
		if (i > 5) {
			userReferrals.insert({referrerId: userId, refereeId: userId, verified: false });
		}
		else {
			userReferrals.insert({referrerId: userId, refereeId: userId, verified: true });
		}
	}
});

Meteor.methods({
	userReferred: function(user, referrerId) {
		var referee = Meteor.users.findOne({"emails.address": user.email});
		Meteor._debug(referee);
		check(referrerId, String);
		var referrer = Meteor.users.findOne({_id: referrerId});
		userReferrals.insert({referrerId: referrerId, refereeId: referee._id, verified: false});
	},
	userReferredSocialSignup: function(refereeId, referrerId) {
		check(referrerId, String);
		check(refereeId, String);
		userReferrals.insert({referrerId: referrerId, refereeId: refereeId, verified: true});
	},
	referralEmail: function(email1, email2, subject, text) {
		Email.send({
			from: "XboxDash <xboxdashbugreporter@gmail.com>",
			to: email1 + ", " + email2,
			subject: subject,
			text: text
		});
	},
	userHasSeenReferralBox: function() {
		var user = Meteor.user();
		Meteor._debug(user);
		Meteor.users.upsert({_id: user._id}, {$set: {userSeenReferralBox: true}});
	}
});