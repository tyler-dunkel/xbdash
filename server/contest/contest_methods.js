Meteor.methods({
	checkReferralToken: function(contestToken) {
		var user = Meteor.user();
		if (!user) return;
		var contest = xbdContests.findOne({ contestToken: contestToken });
		if (contest.status !== 'active') {
			return;
		}
		var referralToken = userContestEntries.findOne({status: 'active', contestToken: contest.contestToken, userId: user._id });
		if (referralToken) {
			return referralToken.data.token;
		} else {
			var referralId = Random.id(7);		
			userContestEntries.insert({ status: 'active', contestToken: contestToken, userId: user._id, data: { token: referralId, value: 0 }, createdAt: new Date(), contestType: 'referral', entryType: 'referral' });
			return referralId;
		}
	},
	resolveReferralToken: function(token) {
		this.unblock();
		var user = Meteor.user(),
			userToken = '';
		if (!user) return;
		var checkContestToken = xbdContests.findOne({ status: 'active', contestToken: token });
		var checkForUserToken = userContestEntries.findOne({status: 'active', 'data.token': token });
		if (checkContestToken) {
			//user was referred from contest page, give the signed up user a token and count
			userToken = Random.id(7);
			//xbdContests.update({ status: 'active' }, { $push: { entries: { userId: user._id, referralToken: userToken, referralCount: 1 } } });
			userContestEntries.insert({ status: 'active', contestToken: token, userId: user._id, data: { token: userToken, value: 1 }, createdAt: new Date(), contestType: 'referral', entryType: 'signup' });
		} else if (checkForUserToken) {
			userToken = Random.id(7);
			//user was referred by another user. give that user a count increment
			//userContest.update({ status: 'active', entries: { $elemMatch: { referralToken: token } } }, { $inc: { 'entries.$.referralCount': 1 } });
			userContestEntries.insert({ status: 'active', contestToken: checkForUserToken.contestToken, userId: user._id, data: { token: userToken, value: 1 }, createdAt: new Date(), contestType: 'referral', entryType: 'referral' });
			userContestEntries.update({status: 'active', 'data.token': token}, {$inc: { 'data.value': 1 }});
		} else {
			//token invalid. just return;
			console.log('not valid token');
			return;
		}
	} 
});