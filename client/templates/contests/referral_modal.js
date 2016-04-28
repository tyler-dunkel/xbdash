Template.referralModalTemplate.created = function() {
  var self = this;
  self.referralToken = new ReactiveVar();
  console.log(self.data);
  Meteor.call('checkReferralToken', function(err, res) {
    if (err) {
      self.referralToken.set('error');
    } else{
      console.log(res);
      console.log('setting react var');
      self.referralToken.set(res);
      console.log(self.referralToken.get());
    }
  });
}

Template.referralModalTemplate.helpers({
  'referralUrl': function() {
    var inst = Template.instance();
    var referralToken = Template.instance().referralToken.get();
    console.log('fired helper');
    console.log(referralToken + ' is the referralToken');
    console.log(inst);
    if (referralToken === '') {
      return 'Generating your token please wait';
    }
    else if (referralToken === 'error') {
      return 'there was an error generating your share url';
    }
    else {
      return 'https://beta.xbdash.com/signUp?referralToken=' + referralToken;
    }
  },
  'debugger': function() {
    //console.log(this);
  }
});
