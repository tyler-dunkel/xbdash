subMana = new SubsManager();

Router.configure({
	waitOn: function() {
		if (Meteor.user()) {
			return [
				subMana.subscribe('globalUserFields'),
				subMana.subscribe('userReferralInfo')
			];
		}
	}
}, {
	hash: 'maintainScroll=1'
});

SignUpController = RouteController.extend({
	layoutTemplate: 'staticLayout'
});

VerifyEmailController = RouteController.extend({
	layoutTemplate: 'staticLayout',
	verifyEmail: function () {
		Accounts.verifyEmail(this.params.token, function() {
			console.log('verified email');
		});
		Router.go('confirmGt');
	}
});

DashboardController = RouteController.extend({
	loadingTemplate: 'loadingTemplate',
	layoutTemplate: 'mainLayout'
});

Router.map(function() {
	this.route('home', {
		path: '/',
		template: 'dashboard',
		controller: 'DashboardController',
		fastRender: true,
		onBeforeAction: function () {
			if (Meteor.user()) {
				var user = Meteor.user();
				if (!user.gamertagScanned) {
					Router.go('confirmGt');
				} else {
					this.next();
				}
			} else {
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
	this.route('referralSignUp', {
		path: '/referral-signup/:userId',
		template: 'referralSignUp',
		controller: 'SignUpController'
	});
	this.route('settingsPage', {
		path: '/settings',
		template: 'settingsPage',
		controller: 'DashboardController'
	});
	this.route('forgotPassword', {
		path: '/forgot-password',
		template: 'forgotPassword',
		controller: 'SignUpController'
	});
	this.route('resetPassword', {
		path: '/reset-password/:token',
		template: 'resetPassword',
		controller: 'SignUpController'
	});
	this.route('confirmEmail', {
		path: '/confirm-email',
		template: 'confirmEmail',
		controller: 'SignUpController'
	});
	this.route('verifyEmail', {
		path: '/verify-email/:token',
		controller: 'VerifyEmailController',
		action: 'verifyEmail'
	});
	this.route('confirmGt', {
		path: '/confirm-gamertag',
		template: 'confirmGt',
		controller: 'SignUpController'
	});
	this.route('privacyPolicy', {
		path: '/privacy-policy',
		template: 'privacyPolicy',
		controller: 'SignUpController'
	});
	this.route('termsConditions', {
		path: '/terms-conditions',
		template: 'termsConditions',
		controller: 'SignUpController'
	});
	this.route('leaderboardsPage', {
		path: '/leaderboards',
		template: 'leaderboardsPage',
		controller: 'DashboardController'
	});
	this.route('achievementsPage', {
		path: '/achievements',
		template: 'achievementsPage',
		controller: 'DashboardController'
	});
	this.route('gamesPage', {
		path: '/games',
		template: 'gamesPage',
		controller: 'DashboardController'
	});
	this.route('newsPage', {
		path: '/news',
		template: 'newsPage',
		controller: 'DashboardController',
		waitOn: function() {
			Meteor.subscribe('latestNews');
		},
		fastRender: true
	});
	this.route('helpPage', {
		path: '/help',
		template: 'helpPage',
		controller: 'DashboardController'
	});
	this.route('searchPage', {
		path: '/search',
		template: 'searchPage',
		controller: 'DashboardController'
	});
	this.route('/news/:id', {
		name: 'article',
		path: '/news/:id',
		template: 'newsSinglePage',
		controller: 'DashboardController',
		waitOn: function() {
			var id = Router.current().params.id;
			Meteor.subscribe('singleNews', id);
		},
		fastRender: false
	});
	this.route('/gamesPage/:slug', {
		name: 'game',
		path: '/games/:slug',
		template: 'gamesSinglePage',
		controller: 'DashboardController',
		waitOn: function() {
			var slug = Router.current().params.slug;
			Meteor.subscribe('singleGame', slug);
		},
		fastRender: true
	});
	this.route('/achievementsPage/:slug', {
		name: 'achievement',
		path: '/achievements/:slug',
		template: 'achievementsSinglePage',
		controller: 'DashboardController',
		waitOn: function() {
			var slug = Router.current().params.slug;
			Meteor.subscribe('singleAchievement', slug);
		},
		fastRender: true
	});
});

// Router.onBeforeAction(function() {
// 	if (Meteor.user()) {
// 		var user = Meteor.user();
// 		if (typeof user.profile.gamercard === 'undefined') {
// 			Router.go('confirmGt');
// 		}
// 	}
// 	this.next();
// }, {only: ['signUp', 'logIn']});