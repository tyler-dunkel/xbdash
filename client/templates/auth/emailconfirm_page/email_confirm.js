Template.gtConfirm.rendered = function() {
}

Template.gtConfirm.events({
	'click #continue-dashboard': function(event) {
		Router.go('home');
		return;
    },
	'submit #emailconfirmform': function(e, user) {
		subMana.clear();
		e.preventDefault();

		Meteor.call('sendVerify', user, function(error, result) {
			if (typeof error !== 'undefined') {
				sweetAlert({
					title: "Email Verification Sent",
					text: "Please check your Inbox for the link to verify your email.",
					type: "success",
					confirmButtonColor: "#118B12",
					confirmButtonText: "OK",
					closeOnConfirm: false,
					html: true
				});
				return;
			}
		});
	}
});

Tracker.autorun(function() {
});