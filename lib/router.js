subMana = new SubsManager();

Router.configure({
	//layoutTemplate: 'layout',
	//waitOn: function() {
	//	return Meteor.subscribe('userSocialServices');
	//}
});

SignUpController = RouteController.extend({
	layoutTemplate: 'staticLayout',
	verifyEmail: function () {
		Accounts.verifyEmail(this.params.token, function(err) {
			if (err != null) {
				if (err.message = 'Verify email link expired [403]') {
					console.log('Sorry this verification link has expired.')
					Router.go('confirmEmail');
				}
			} else {
				console.log('Thank you! Your email address has been confirmed.')
				Router.go('confirmGt');
			}
		});
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
		onBeforeAction: function () {
			if (Meteor.user()) {
				var user = Meteor.user();
				if (typeof user.profile.xuid === 'undefined') {
					Router.go('confirmGt');
				} else {
					this.next();
				}
			} else {
				this.render('aboutUs');
			}
		},
		waitOn: function() {
			return [
				subMana.subscribe('userAchievements'),
				subMana.subscribe('userGames')
			];
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

	this.route('confirmEmail', {
		path: '/confirm-email',
		template: 'confirmEmail',
		controller: 'SignUpController',
		onBeforeAction: function () {
			if (Meteor.user()) {
				this.next();
			} else {
				Router.go('signUp');
			}
		}
	});
	this.route('confirmGt', {
		path: '/confirm-gamertag/:token',
		template: 'confirmGt',
		controller: 'SignUpController',
		action: 'verifyEmail'
		/*
		onBeforeAction: function () {
			Accounts.verifyEmail(this.params.token, function(err) {
				if (err != null) {
					if (err.message = 'Verify email link expired [403]') {
						console.log('Sorry this verification link has expired.')
						Router.go('confirmEmail');
					}
				} else {
					console.log('Thank you! Your email address has been confirmed.')
					Router.go('confirmGt');
				}
			});
		}
		*/
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
		controller: 'DashboardController'
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
		controller: 'DashboardController'
	});
	this.route('/gamesPage/:slug', {
		name: 'game',
		path: '/games/:slug',
		template: 'gamesSinglePage',
		controller: 'DashboardController'
	});
	this.route('/achievementsPage/:slug', {
		name: 'achievement',
		path: '/achievements/:slug',
		template: 'achievementsSinglePage',
		controller: 'DashboardController'
	});
});

Router.onBeforeAction(function() {
	if (Meteor.user()) {
		var user = Meteor.user();
		if (typeof user.profile.gamercard === 'undefined') {
			Router.go('confirmGt');
		}
	}
	this.next();
}, {only: ['signUp', 'logIn']});