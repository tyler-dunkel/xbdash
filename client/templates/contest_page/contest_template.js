Template.contestPage.created = function() {
	DocHead.removeDocHeadAddedTags();

	var contestPageDescription = "Participate in this month's contest. Win games, accessories, and more!";
	var contestPageImage = "https://www.xbdash.com/img/share-default.jpg";
	var contestPageTitle = "Contests | XBdash - The Personalized Dashboard for Xbox® Gamers";
	var contestPageUrl = window.location.href;

	var contestPageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": contestPageDescription },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": contestPageDescription },
		{ "property": "og:image", "content": contestPageImage },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": contestPageTitle },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": contestPageUrl },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:url", "content": contestPageUrl },
		{ "name": "twitter:title", "content": contestPageTitle },
		{ "name": "twitter:description", "content": contestPageDescription },
		{ "name": "twitter:image:src", "content": contestPageImage },
		{ "name": "twitter:site", "content": "@xboxdash" }
	];

	var linkInfo = [
		{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": contestPageUrl },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
	];

	DocHead.setTitle(contestPageTitle);

	for(var i = 0; i < contestPageMeta.length; i++) {
		DocHead.addMeta(contestPageMeta[i]);;
	}

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}
}

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
		var getImage = "https://www.xbdash.com/img/contests/contest-banner.jpg";

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