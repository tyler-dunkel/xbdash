Router.configure({
	layout: 'layout',
});

Router.map(function() {
	this.route('home', {
		path: '/',
		template: 'aboutUs'
		/*
		onBeforeAction: function (pause) {
			if (!Meteor.user()) {
				this.render('aboutUs');
			}
		}
		*/
	});
	this.route('aboutUs', {
		path: '/about-us',
		template: 'aboutUs'
	});
	this.route('signUp', {
		path: '/signup',
		template: 'signUp'
	});
});