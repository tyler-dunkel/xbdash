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
	console.log(this);
	console.log(this.data);
	Meteor.call('checkReferralToken', this.data.contestToken, function(err, res) {
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
	prizeClasses: function() {
		var prizeCount = Template.parentData().prizes.length;
		if (prizeCount === 1) {
			return 'col-md-6 col-xs-12';
		}
		if (prizeCount === 2) {
			return 'col-md-3 col-xs-6';
		}
		if (prizeCount === 3) {
			return 'col-md-4 col-xs-12';
		}
		return;
	},
	rulesClasses: function() {
		var prizeCount = this.prizes ? this.prizes.length : 0;
		if (prizeCount === 1) {
			return 'col-md-6 col-xs-12';
		}
		if (prizeCount === 2) {
			return 'col-md-6 col-xs-12';
		}
		if (prizeCount === 3) {
			return 'col-md-12 col-xs-12';
		}
		return;
	},
	getPlace: function(index) {
		if (index === 0) return 'Grand Prize';
		if (index === 1) return 'Second Place Prize';
		if (index === 2) return 'Third Place Prize';
	},
	referralUrl: function() {
		var referralToken = Template.instance().referralToken.get();
		if (referralToken === '') {
			return 'Generating your token please wait';
		} else if (referralToken === 'error') {
			return 'There was an error generating your share url.';
		} else {
			return 'https://www.xbdash.com/contests?referraltoken=' + referralToken;
		}
	},
	getLocalStartDate: function() {
		return moment(this.startDate).local().format('MMMM Do YYYY, h:mm a');
	},
	getStartDate: function() {
		return moment().utc(this.startDate).format('MMMM Do YYYY, h:mm a');
	},
	getLocalEndDate: function() {
		return moment(this.endDate).local().format('MMMM Do YYYY, h:mm a');
	},
	getEndDate: function() {
		return moment().utc(this.endDate).format('MMMM Do YYYY, h:mm a');
	},
	getAwardDate: function() {
		return moment().utc(this.awardDate).format('MMMM Do YYYY, h:mm a');
	},
	contestData: function () {
		var referralToken = Template.instance().referralToken.get();
		var getImage = "https://www.xbdash.com/img/contests/july-contest-banner.jpg";

		return {
			title: "I just entered to win a FREE engraved #Xbox controller in the #XBdash July #Contest! #gaming #gamer",
			description: 'Manage your Xbox achievements and work together with other Xbox® gamers to unlock them and complete games together.',
			image: function () {
				return getImage;
			},
			author: 'xboxdash',
			url: 'https://www.xbdash.com/contests?referraltoken=' + referralToken
		}
	}
});

Template.referralContest.events({
	'click .referral-signup': function(e) {
		e.preventDefault();
		var referralToken = Router.current().params.query.referraltoken;
		if (referralToken) {
			Router.go('signUp', {}, { query: 'referraltoken=' + referralToken });
		} else {
			Router.go('signUp', {}, { query: 'referraltoken=' + this.contestToken });
		}
	}
});