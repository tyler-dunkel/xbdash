Template.contestTemplate.created = function() {
  var self = this;
  this.contestToken = 'fewafew';
  self.referralToken = new ReactiveVar('');
  console.log(self.data);
  Meteor.call('checkReferralToken', function(err, res) {
    if (err) {
      self.referralToken.set('error');
    } else{
      self.referralToken.set(res);
    }
  });
}

Template.contestTemplate.helpers({
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
      return 'https://beta.xbdash.com/signup?referraltoken=' + referralToken;
    }
  },
  'debugger': function() {
    //console.log(this);
  }
});

Template.contestTemplate.events({
  'click .referral-signup': function(e) {
    e.preventDefault();
    var contestToken = Template.instance().contestToken;
    Router.go('signUp', {}, {query: 'referraltoken=' + contestToken});
  }
});
