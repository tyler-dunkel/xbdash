Router.configure({
	layoutTemplate: 'layout',
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
		onAfterAction: function() {
			$('#layout-background').addClass('signup-background');
		},
		onStop: function() {
			$('#layout-background').removeClass('signup-background');
		}
	});
	this.route('loading', {
		path: '/loading',
		template: 'loading'
	});
});