SyncedCron.add({
	name: "verify referral docs by checking for verified email (social referrals autoverifyied)",
	schedule: function(parser) {
		return parser.text('every 1 hour');
	},
	job: function() {
		var referrals = userReferrals.find({verified: false});

		if (referrals.count() < 1) return;
		referrals.forEach(function(ref) {
			var referee = Meteor.users.findOne({_id: ref.refereeId});
			if (!referee.emails || !referee.emails[0].verified) return;
			userReferrals.update({_id: ref._id}, {$set: {verified: true}});
			Meteor.users.update({_id: ref.referrerId}, {$inc: {userReferralCount: 1}});
		});
	}
});

// Meteor.setInterval(function() {
	// 	var referrals = userReferrals.find({verified: false});
		
	// 	if (referrals) {
	// 		referrals.forEach(function(referral) {
	// 			var referee = Meteor.users.findOne({_id: referral.refereeId});
	// 			if (!referee.emails[0].verified) {
	// 				return;	
	// 				Meteor._debug("the email isnt verified" + referee.emails[0].verified);
	// 			}
	// 			Meteor._debug("the referral should be set to true");
	// 			userReferrals.update({_id: referral._id}, {$set: {verified: true}});
	// 			Meteor.users.update({_id: referral.referrerId}, {$inc: {userReferralCount: 1}});
	// 		});
	// 	}
	// }, 1000);