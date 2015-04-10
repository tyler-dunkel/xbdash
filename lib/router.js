Router.configure({
	layout: 'layout',
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
		template: 'signUp'
	});
	this.route('loading', {
		path: '/loading',
		template: 'loading'
	});
});