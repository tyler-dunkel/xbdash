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
});
