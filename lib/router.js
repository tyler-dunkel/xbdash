Router.configure({
	//layoutTemplate: 'layout',
});

SignUpController = RouteController.extend({
	layoutTemplate: 'staticLayout',
	template: 'signUp'
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
		template: 'aboutUs'
	});
	this.route('signUp', {
		path: '/signup',
		template: 'signUp',
		controller: 'SignUpController'
	});
	this.route('loading', {
		path: '/loading',
		template: 'loading'
	});
	this.route('terms', {
		path: '/terms-of-use',
		template: 'terms',
		controller: 'SignUpController'
	});
	this.route('privacy', {
		path: '/privacy-policy',
		template: 'privacy',
		controller: 'SignUpController'
	});
});