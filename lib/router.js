subMana = new SubsManager();

Router.configure({
	//layoutTemplate: 'layout',
	//waitOn: function() {
	//	return Meteor.subscribe('userSocialServices');
	//}
});

SignUpController = RouteController.extend({
	layoutTemplate: 'staticLayout'
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
			if (Accounts._verifyEmailToken && Meteor.user()) {
				var user = Meteor.user();
				if (typeof user.profile.xuid === 'undefined') {
					Router.go('gtConfirm');
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
	this.route('emailConfirm', {
		path: '/confirm-email',
		template: 'emailConfirm',
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
	this.route('gtConfirm', {
		path: '/confirm-gamertag',
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
		if (typeof user.username === 'undefined') {
			Router.go('gtConfirm');
		}
	}
	this.next();
}, {only: ['signUp', 'logIn']});