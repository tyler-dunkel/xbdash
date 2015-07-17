Template.confirmEmail.rendered = function() {
}

Template.confirmEmail.events({
	'click #continue-dashboard': function(event) {
		Router.go('home');
		return;
    }
});

Tracker.autorun(function() {
});