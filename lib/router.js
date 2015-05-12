Router.configure({
	//layoutTemplate: 'layout',
	//waitOn: function() {
	//	return Meteor.subscribe('userSocialServices');
	//}
});

SignUpController = RouteController.extend({
	layoutTemplate: 'staticLayout'
});

Router.map(function() {
	this.route('home', {
		path: '/',
		template: 'dashboard',
		onBeforeAction: function () {
			if (Meteor.user()) {
				var user = Meteor.user();
				if (typeof user.profile.xuid === 'undefined') {
					Router.go('gtConfirm');
				} else {
					this.next();
				}
			} else  {
				this.render('aboutUs');
			}
		}
	});
	this.route('aboutUs', {
		path: '/about-us',
		template: 'aboutUs',
		controller: 'SignUpController'
	});
	this.route('signUp', {
		path: '/signup',
		template: 'signUp',
		controller: 'SignUpController'
	});
	this.route('logIn', {
		path: '/login',
		template: 'logIn',
		controller: 'SignUpController'
	});
	this.route('gtConfirm', {
		path: '/gtconfirm',
		template: 'gtConfirm',
		controller: 'SignUpController',
		onBeforeAction: function () {
			if (Meteor.user()) {
				var user = Meteor.user();
				if (typeof user.profile.xuid === 'undefined') {
					this.next();
				}
			} else {
				Router.go('logIn');
			}
		}
	});
	this.route('privacyPolicy', {
		path: '/privacy-policy',
		template: 'privacyPolicy',
		controller: 'SignUpController'
	});
	this.route('termsOfUse', {
		path: '/terms-of-use',
		template: 'termsOfUse',
		controller: 'SignUpController'
	});
	this.route('leaderboardsPage', {
		path: '/leaderboards',
		template: 'leaderboardsPage'
	});
	this.route('achievementsPage', {
		path: '/achievements',
		template: 'achievementsPage'
	});
	this.route('gamesPage', {
		path: '/games',
		template: 'gamesPage'
	});
	this.route('newsPage', {
		path: '/news',
		template: 'newsPage'
	});
	this.route('helpPage', {
		path: '/help',
		template: 'helpPage'
	});
	this.route('searchPage', {
		path: '/search',
		template: 'searchPage'
	});
});

Router.onBeforeAction(function() {
	if (Meteor.user()) {
		var user = Meteor.user();
		if (typeof user.username === 'undefined') {
			Router.go('gtConfirm');
		}
	}
	this.next();
}, {only: ['signUp', 'logIn']});