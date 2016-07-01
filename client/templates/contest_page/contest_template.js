// contestObj = {
// 	"_id": "DM3nM6u9gApc7NB7S",
// 	"status": "active",
// 	"rules": [
// 		"<strong><em>Get an extra entry</em></strong> into this month's contest for each friend you invite that signs up through your link below.",
// 		"Only <strong><em>verified emails qualify</em></strong> as an entry to this contest.",
// 		"1 first place winner will receive a copy of Overwatch: Origins Edition in original packaging.",
// 		"1 second place winner will receive a copy of Fallout 4 in original packaging."
// 	],
// 	"prizes": [
// 		{
// 			"title": "Overwatch - Origins Edition",
// 			"imageUrl": "https://www.xbdash.com/img/contests/overwatch-xbone.png",
// 			"isPremium": false
// 		}
// 	],
// 	"contestToken": "xbdDirect",
// 	"entries": [ 
// 		{
// 			"userId": "numKGua7JywHbnPBS",
// 			"referralToken": "pciniXj",
// 			"referralCount": 0
// 		},
// 		{
// 			"userId": "numKGua7JywHbnPBf",
// 			"referralToken": "pciniXj",
// 			"referralCount": 0
// 		}
// 	],
// 	"startDate": ISODate("2016-07-01T00:00:00Z"),
// 	"endDate": ISODate("2016-07-31T23:59:59Z"),
// 	"awardDate": ISODate("2016-08-01T12:00:00Z"),
// 	"title": "july controller contest",
// 	"description": "yada yada yada"
// }

Template.contestPage.created = function() {
	DocHead.removeDocHeadAddedTags();

	var contestPageDescription = "Participate in this month's contest. Win games, accessories, and more!";
	var contestPageImage = "https://www.xbdash.com/img/share-default.jpg";
	var contestPageTitle = "Contests | XBdash - The Personalized Dashboard for Xbox® One and Xbox® 360 Gamers";
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

	this.autorun(function() {
		Meteor.subscribe('xbdContestsPub');
	});
}

Template.contestPage.helpers({
	contest: function () {
		return xbdContests.findOne({ "status": "active" });
	}
});

Template.referralContest.created = function() {
	var self = this; 
	self.referralToken = new ReactiveVar('');

	console.log("contest token" + this.contestToken);
	console.log("contest token" + self.referralToken);

	Meteor.call('checkReferralToken', function(err, res) {
		if (err) {
			self.referralToken.set('error');
		}
		self.referralToken.set(res);
	});
}

Template.referralContest.rendered = function() {
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

Template.referralContest.helpers({
	getPlace: function(index) {
		if (index === 0) return 'First';
		if (index === 1) return 'Second';
		if (index === 2) return 'Third';
	},
	referralUrl: function() {
		var referralToken = Template.instance().referralToken.get();
		if (referralToken === '') {
			return 'Generating your token please wait';
		} else if (referralToken === 'error') {
			return 'There was an error generating your share url.';
		} else {
			return 'https://www.xbdash.com/signup?referraltoken=' + referralToken;
		}
	},
	getStartDate: function() {
		return moment(this.startDate).format('MMMM Do YYYY, h:mm a');
	},
	getEndDate: function() {
		return moment(this.endDate).format('MMMM Do YYYY, h:mm a');
	},
	getAwardDate: function() {
		return moment(this.awardDate).format('MMMM Do YYYY, h:mm a');
	},
	contestData: function () {
		var referralToken = Template.instance().referralToken.get();
		var getImage = "https://www.xbdash.com/img/contests/new-contest-banner.jpg";

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

Template.referralContest.events({
	'click .referral-signup': function(e) {
		e.preventDefault();
		Router.go('signUp', {}, { query: 'referraltoken=' + this.contestToken });
	}
});

// Template.prizeArea.created = function () {
// 	var prizeCounter = 0;
// };

// Template.prizeArea.helpers({
// 	getPlace: function(index) {
// 		if (index === 0) return 'First';
// 		if (index === 1) return 'Second';
// 		if (index === 2) return 'Third';
// 	}
// });