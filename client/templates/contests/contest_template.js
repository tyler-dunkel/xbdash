Template.contestApp.created = function() {
	var self = this;
	this.contestToken = 'fewafew';
	self.referralToken = new ReactiveVar('');
	// console.log(self.data);
	Meteor.call('checkReferralToken', function(err, res) {
		if (err) {
			self.referralToken.set('error');
		}
		self.referralToken.set(res);
	});
}

Template.contestApp.rendered = function() {
	$('#copy-button').tooltip();
	$('#copy-button').bind('click', function() {
		var input = document.querySelector('#copy-input');
		input.setSelectionRange(0, input.value.length + 1);
		try {
			var success = document.execCommand('copy');
			if (success) {
				$('#copy-button').trigger('copied', ['Copied!']);
			} else {
				$('#copy-button').trigger('copied', ['Copy with Ctrl-C']);
			}
		} catch (err) {
			$('#copy-button').trigger('copied', ['Copy with Ctrl-C']);
		}
	});
	$('#copy-button').bind('copied', function(event, message) {
		$(this).attr('title', message)
		.tooltip('fixTitle')
		.tooltip('show')
		.attr('title', "Copy to Clipboard")
		.tooltip('fixTitle');
	});
}

Template.contestApp.helpers({
	'referralUrl': function() {
		// var inst = Template.instance();
		var referralToken = Template.instance().referralToken.get();
		// console.log('fired helper');
		// console.log(referralToken + ' is the referralToken');
		// console.log(inst);
		if (referralToken === '') {
			return 'Generating your token please wait';
		} else if (referralToken === 'error') {
			return 'There was an error generating your share url.';
		} else {
			return 'https://beta.xbdash.com/signup?referraltoken=' + referralToken;
		}
	},
    contestData: function () {
        var referralToken = Template.instance().referralToken.get();
        var getImage = "/img/contests/share-banner.jpg";

        return {
            title: 'I Recently Signed Up For XBdash, A Personalized Dashboard For Xbox Gamers!',
            description: 'Manage your Xbox progress and work together with other Xbox® gamers to unlock them.',
            image: function () {
                return getImage;
            },
            author: 'xboxdash',
            url: 'https://beta.xbdash.com/signup?referraltoken=' + referralToken
        }
    }
});

Template.contestApp.events({
	'click .referral-signup': function(e) {
		e.preventDefault();
		var contestToken = Template.instance().contestToken;
		Router.go('signUp', {}, { query: 'referraltoken=' + contestToken });
	}
});
