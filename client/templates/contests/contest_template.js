Template.contestApp.created = function() {
	var self = this;
	this.contestToken = 'xbdDirect';
	self.referralToken = new ReactiveVar('');
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
		var referralToken = Template.instance().referralToken.get();
		if (referralToken === '') {
			return 'Generating your token please wait';
		} else if (referralToken === 'error') {
			return 'There was an error generating your share url.';
		} else {
			return 'https://www.xbdash.com/signup?referraltoken=' + referralToken;
		}
	},
	contestData: function () {
		var referralToken = Template.instance().referralToken.get();
		var getImage = "https://www.xbdash.com/img/contests/share-banner.jpg";

		return {
			title: "I just entered to win a FREE #Xbox Game in the #XBdash Launch #Contest! #gaming #gamer",
			description: 'Manage your Xbox achievements and work together with other Xbox® gamers to unlock them and complete games together.',
			image: function () {
				return getImage;
			},
			author: 'xboxdash',
			url: 'https://www.xbdash.com/signup?referraltoken=' + referralToken
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