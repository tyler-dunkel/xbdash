Template.mainLayout.helpers({
	checkHome: function() {
		if (Router.current().route.getName() === 'home') {
			return true;
		}
	}
});