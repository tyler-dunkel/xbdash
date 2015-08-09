Template.dashboardNav.rendered = function() {
	$('li.disabled.no-user').popover({
		animation: true,
		html: true,
		placement: 'right',
		trigger: 'hover',
		title: '<center>Dashboard Disabled</center>',
		content: '<a href="/signup" class="btn btn-link btn-md aside-signup2" style="text-align: center;">Sign up</a> to claim your personalized dashboard.'
	});
	$('li.disabled.no-gamertag').popover({
		animation: true,
		html: true,
		placement: 'right',
		trigger: 'hover',
		title: '<center>Dashboard Disabled</center>',
		content: '<a href="/confirm-gamertag" class="btn btn-link btn-md aside-signup2" style="text-align: center;">Confirm your gamertag</a> to finalize your personalized dashboard.'
	});
}

Template.dashboardNav.helpers({
	isDashboardEnabled: function() {
		var user = Meteor.user();
		if (user && user.gamertagScanned) {
			return 'enabled';
		} else {
			return 'disabled';
		}
	},
	dashboardPopover: function() {
			var user = Meteor.user();
			if (user && !user.gamertagScanned) {
				return 'no-gamertag';
			}
			else {
				return 'no-user';
			}
	}
});