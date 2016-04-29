Template.dashboardNav.created = function() {
	this.autorun(function() {
		var user = Meteor.user();
		console.log("autorun for dashboard nav ran");
		if (user && user.gamertagScanned && user.gamertagScanned.status !== 'false') {
			console.log("autorun for dashboard nav returned / href");
			$('li a.dashboard-link').attr("href", "/");
		} else {
			console.log("autorun for dashboard nav returned # href");
			$('li a.dashboard-link').attr("href", "#");
		}
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
	},
	'click li.contest-modal-trigger': function (e) {
		// console.log("fired");
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
		}
});
