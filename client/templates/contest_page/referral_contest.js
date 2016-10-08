// Template.referralContestTemplate.created = function() {
// 	var self = this;
// 	self.referralToken = new ReactiveVar('');
// 	self.entryCount = new ReactiveVar();
// 	Meteor.call('checkReferralToken', Router.current().params.contestToken, function(err, res) {
// 		if (err) {
// 			self.referralToken.set('error');
// 		}
// 		self.referralToken.set(res);
// 	});
// 	Meteor.call('getContestEntryCount', Router.current().params.contestToken, function(err, res) {
// 		if (err) {
// 			console.log('error getting referral contest count');
// 		}
// 		console.log(res);
// 		self.entryCount.set(res);
// 	});
// }

// Template.referralContestTemplate.rendered = function() {
// 	$('#copy-button').tooltip();
// 	$('#copy-button').bind('click', function() {
// 		var input = document.querySelector('#copy-input');
// 		input.setSelectionRange(0, input.value.length + 1);
// 		try {
// 			var success = document.execCommand('copy');
// 			if (success) {
// 				$('#copy-button').trigger('copied', ['Copied!']);
// 			} else {
// 				$('#copy-button').trigger('copied', ['Copy with Ctrl-C']);
// 			}
// 		} catch (err) {
// 			$('#copy-button').trigger('copied', ['Copy with Ctrl-C']);
// 		}
// 	});
// 	$('#copy-button').bind('copied', function(event, message) {
// 		$(this).attr('title', message)
// 		.tooltip('fixTitle')
// 		.tooltip('show')
// 		.attr('title', "Copy to Clipboard")
// 		.tooltip('fixTitle');
// 	});
// }

// Template.referralContestTemplate.helpers({
// 	contest: function () {
// 		return xbdContests.findOne({ "contestToken": Router.current().params.contestToken });
// 	},
// 	prizeClasses: function() {
// 		var prizeCount = Template.parentData().prizes.length;
// 		if (prizeCount === 1) {
// 			return 'col-md-12';
// 		}
// 		if (prizeCount === 2) {
// 			return 'col-md-12';
// 		}
// 		if (prizeCount === 3) {
// 			return 'col-md-12';
// 		}
// 		return;
// 	},
// 	rulesClasses: function() {
// 		var prizeCount = this.prizes ? this.prizes.length : 0;
// 		if (prizeCount === 1) {
// 			return 'col-md-6 col-xs-12';
// 		}
// 		if (prizeCount === 2) {
// 			return 'col-md-6 col-xs-12';
// 		}
// 		if (prizeCount === 3) {
// 			return 'col-md-12 col-xs-12';
// 		}
// 		return;
// 	},
// 	getPlace: function(index) {
// 		if (index === 0) return 'Grand Prize';
// 		if (index === 1) return 'Second Place Prize';
// 		if (index === 2) return 'Third Place Prize';
// 	},
// 	referralUrl: function() {
// 		var referralToken = Template.instance().referralToken.get();
// 		if (referralToken === '') {
// 			return 'Generating your token please wait';
// 		} else if (referralToken === 'error') {
// 			return 'There was an error generating your share url.';
// 		} else {
// 			return 'https://www.xbdash.com/contests?referraltoken=' + referralToken;
// 		}
// 	},
// 	countEntries: function() {
// 		var entryCount = Template.instance().entryCount.get();
// 		if (entryCount) {
// 			return numberFormatter(entryCount);
// 		} else {
// 			return '0';
// 		}
// 	},
// 	getLocalStartDate: function() {
// 		return moment(this.startDate).local().format('MMMM Do YYYY, h:mm a');
// 	},
// 	getStartDate: function() {
// 		return moment.utc(this.startDate).format('MMMM Do YYYY, h:mm a');
// 	},
// 	getLocalEndDate: function() {
// 		return moment(this.endDate).local().format('MMMM Do YYYY, h:mm a');
// 	},
// 	getEndDate: function() {
// 		return moment.utc(this.endDate).format('MMMM Do YYYY, h:mm a');
// 	},
// 	getLocalAwardDate: function() {
// 		return moment(this.awardDate).local().format('MMMM Do YYYY, h:mm a');
// 	},
// 	getAwardDate: function() {
// 		return moment.utc(this.awardDate).format('MMMM Do YYYY, h:mm a');
// 	},
// 	contestPrice: function() {
// 		return '5 Credits';
// 	},
// 	contestData: function() {
// 		var referralToken = Template.instance().referralToken.get();
// 		var getImage = "https://www.xbdash.com/img/contests/august-contest-banner.jpg";

// 		return {
// 			title: "I entered to win two 12-Month Xbox LIVE Gold Memberships in the August Contest! #gamergirl #twitch",
// 			description: 'Manage your Xbox achievements and work together with other Xbox® gamers to unlock them and complete games together.',
// 			image: function () {
// 				return getImage;
// 			},
// 			author: 'xboxdash',
// 			url: 'https://www.xbdash.com/contests?referraltoken=' + referralToken
// 		}
// 	}
// });

// Template.referralContestTemplate.events({
// 	'click .referral-signup': function(e) {
// 		e.preventDefault();
// 		var referralToken = Router.current().params.query.referraltoken;
// 		if (referralToken) {
// 			Router.go('signUp', {}, { query: 'referraltoken=' + referralToken });
// 		} else {
// 			Router.go('signUp', {}, { query: 'referraltoken=' + this.contestToken });
// 		}
// 	}
// });