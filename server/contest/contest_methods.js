Meteor.methods({
  checkReferralToken: function() {
    var user = Meteor.user();
    var referralToken = xbdContests.findOne({status: 'active', entries: {$elemMatch: {userId: user._id}}}, {fields: {'entries.$.referralToken': 1}});
    console.log(referralToken);
    if (referralToken) {
      console.log('found token');
      return referralToken.entries[0].referralToken;
    } else {
      var referralId = Random.id(7);
      xbdContests.update({status: 'active'}, {$push: {entries: {userId: user._id, referralToken: referralId, referralCount: 0}}});
      return referralId;
    }
  }

  getUserFromReferralTokenSignup: function(referralToken) {
    return xbdContests.findOne({"entries.userId": referraltoken});
  }

  addToReferralCount: function(userId){
    //var user = Meteor.users.update({_id.: user._id}, {add to referral count});
    return "User id: " + user.id + ", now has " + user.referralCount + " referrals";
  }
});
