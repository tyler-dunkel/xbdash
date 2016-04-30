Template.headerLandingPage.events({
	'click .navbar-header button.btn-link': function(e) {
		if ($('.navbar-collapse.collapse').hasClass('in')) {
			$('#header').removeClass('header-primary');
		} else {
			$('#header').addClass('header-primary');
		}
	}
});