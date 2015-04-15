Router.configure({
	//layoutTemplate: 'layout',
});

SignUpController = RouteController.extend({
	layoutTemplate: 'staticLayout'
});

Router.map(function() {
	this.route('home', {
		path: '/',
		template: 'dashboard',
		onBeforeAction: function () {
			if (!Meteor.user()) {
				this.render('aboutUs');
			}
			else {
				this.next();
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
	this.route('newsPage', {
		path: '/news',
		template: 'newsPage',
		controller: 'SignUpController'
	});
	this.route('achievementsPage', {
		path: '/achievements',
		template: 'achievementsPage',
		controller: 'SignUpController'
	});
	this.route('gamesPage', {
		path: '/games',
		template: 'gamesPage',
		controller: 'SignUpController'
	});
	this.route('searchPage', {
		path: '/search',
		template: 'searchPage',
		controller: 'SignUpController'
	});
});