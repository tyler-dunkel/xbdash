Meteor.methods({
	checkReferralToken: function(contestId) {
		var user = Meteor.user();
		if (!user) return;
		//var referralToken = xbdContests.findOne({ status: 'active', entries: { $elemMatch: { userId: user._id } } }, { fields: { 'entries.$.referralToken': 1 } });
		var referralToken = userContestEntries.findOne({status: 'active', contestId: contestId, userId: user._id });
		if (referralToken) {
			console.log('found token');
			return referralToken.data.token;
		} else {
			var referralId = Random.id(7);
			//xbdContests.update({ status: 'active' }, { $push: { entries: { userId: user._id, referralToken: referralId, referralCount: 0 } } });
			userContestEntries.insert({status: 'active', contestToken: contestToken, userId: user._id, data: { token: referralId, referralCount: 0 }, createdAt: new Date(), type: 'referral'});
			return referralId;
		}
	},
	resolveReferralToken: function(token) {
		this.unblock();
		var user = Meteor.user();
		if (!user) return;
		var checkContestToken = xbdContests.findOne({ status: 'active', contestToken: token });
		var checkForUserToken = userContestEntries.findOne({status: 'active', 'data.token': token });
		if (checkContestToken) {
			//user was referred from contest page, give the signed up user a token and count
			var userToken = Random.id(7);
			//xbdContests.update({ status: 'active' }, { $push: { entries: { userId: user._id, referralToken: userToken, referralCount: 1 } } });
			userContestEntries.insert({status: 'active', contestToken: token, userId: user._id, data: {token: userToken, referralCount: 1}, createdAt: new Date(), type: 'referral'});
		} else if (checkForUserToken) {
			console.log('token belonged to user');
			//user was referred by another user. give that user a count increment
			//userContest.update({ status: 'active', entries: { $elemMatch: { referralToken: token } } }, { $inc: { 'entries.$.referralCount': 1 } });
			userContestEntreis.update({status: 'active', 'data.token': token}, {$inc: { 'data.referralCount': 1 }});
		} else {
			//token invalid. just return;
			console.log('not valid token');
			return;
		}
	} 
});