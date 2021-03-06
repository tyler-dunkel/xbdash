Template.dashboardNavTwo.created = function() {
}

Template.dashboardNavTwo.rendered = function () {
	$('nav.navi .nav li a').on('click', function() {
		$('.app-aside').toggleClass('off-screen');
	});
}

Template.dashboardNavTwo.helpers({
	'click li a.home-link': function(e) {
		e.preventDefault();
		var user = Meteor.user();
		Router.go('newsPage');
		document.location.reload(true);
	}
});

Template.dashboardNavTwo.events({
});

Template.dashboardNav.created = function() {
	this.autorun(function() {
		var user = Meteor.user();
		if (user && user.gamertagScanned && user.gamertagScanned.status !== 'false') {
		} else {
			$('li a.dashboard-link').attr("href", "#");
		}
	});
}

Template.dashboardNav.rendered = function () {
	$('nav.navi .nav li a').on('click', function() {
		$('.app-aside').toggleClass('off-screen');
	});
}

Template.dashboardNav.helpers({
	isDashboardEnabled: function() {
		var user = Meteor.user();
		if (user && user.gamertagScanned && user.gamertagScanned.status !== 'false') {
			console.log("dashboard reran and there is a scanned gamertag");
			return 'enabled';
		} else {
			return 'disabled';
		}
	},
	dashboardPopover: function() {
		var user = Meteor.user();
		if (user) {
			if (user.gamertagScanned && user.gamertagScanned.status === 'false') {
				return 'no-gamertag';
			}
			return;
		} else {
			return 'no-user';
		}
	}
});

Template.dashboardNav.events({
	// 'click li a.home-link': function(e) {
	// 	e.preventDefault();
	// 	var user = Meteor.user();
	// 	Router.go('newsPage');
	// 	document.location.reload(true);
	// },
	'click li.disabled.no-user': function (e) {
		e.preventDefault();
		sweetAlert({
			title: 'Dashboard Disabled',
			text: 'Sign up to claim your personalized dashboard.',
			type: "error",
			confirmButtonText: "Sign Up",
			confirmButtonColor: "#138013"
		}, function(e) {
			if (e) {
				Router.go('signUp');
			}
		});
	},
	'click li.disabled.no-gamertag': function (e) {
		e.preventDefault();
		sweetAlert({
			title: 'Dashboard Disabled',
			text: 'Confirm your gamertag to finalize your personalized dashboard.',
			type: "error",
			confirmButtonText: "Confirm Gamertag",
			confirmButtonColor: "#138013"
		}, function(e) {
			if (e) {
				Router.go('confirmGt');
			}
		});
	}
	// ,
	// 'click li.contest-modal-trigger': function (e) {
	// 	console.log("fired");
	// 	e.preventDefault();
	// 	Router.go
	// 	sweetAlert({
	// 		title: 'Contest',
	// 		html: Blaze.toHTML(Template.referralModalTemplate)
	// 	}, function(e) {
	// 		if (e) {
	// 			//Router.go('submit');
	// 		}
	// 	});
	// }
});