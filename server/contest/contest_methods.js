Meteor.methods({
  checkReferralToken: function() {
    var user = Meteor.user();
    if (!user) return;
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
  },
  resolveReferralToken: function(token) {
    this.unblock();
    var user = Meteor.user();
    if (!user) return;
    var checkContestToken = xbdContests.findOne({status: 'active', contestToken: token});
    var checkForUserToken = xbdContests.findOne({status: 'active', entries: {$elemMatch: {referralToken: token}}}, {fields: {'entries.$.referralToken': 1}});
    if (checkContestToken) {
      //user was referred from contest page, give the signed up user a token and count
      var userToken = Random.id(7);
      xbdContests.update({status: 'active'}, {$push: {entries: {userId: user._id, referralToken: userToken, referralCount: 1}}});
    } else if (checkForUserToken) {
      console.log('token belonged to user');
      //user was referred by another user. give that user a count increment
      xbdContests.update({status: 'active', entries: {$elemMatch: {referralToken: token}}}, {$inc: {'entries.$.referralCount': 1}});
    } else {
      //token invalid. just return;
      console.log('not valid token');
      return;
    }
  } 
});
