Template.dashboardNav.rendered = function() {
	$('li.disabled.no-user').popover({
		animation: true,
		html: true,
		placement: 'right',
		trigger: 'click',
		title: '<center><strong>Dashboard Disabled</strong></center>',
		content: '<a href="/signup" class="btn btn-link btn-md aside-signup2" style="text-align: center;">Sign up</a> to claim your personalized dashboard.'
	});
	$('li.disabled.no-gamertag').popover({
		animation: true,
		html: true,
		placement: 'right',
		trigger: 'click',
		title: '<center><strong>Dashboard Disabled</strong></center>',
		content: '<a href="/confirm-gamertag" class="btn btn-link btn-md aside-signup2" style="text-align: center;">Confirm your gamertag</a> to finalize your personalized dashboard.'
	});
	$('li.disabled.no-user a, li.disabled.no-gamertag a').attr("href", "#");
}

Template.dashboardNav.helpers({
	isDashboardEnabled: function() {
		var user = Meteor.user();
		if (user || user.gamertagScanned.status === 'true' || user.gamertagScanned.status === 'updating') {
			return 'enabled';
		} else {
			return 'disabled';
		}
	},
	dashboardPopover: function() {
		var user = Meteor.user();
		if (user || user.gamertagScanned.status === 'false' || user.gamertagScanned.status === 'building') {
			return 'no-gamertag';
		} else {
			return 'no-user';
		}
	}
});