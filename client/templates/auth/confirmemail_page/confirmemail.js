Template.confirmEmail.created = function() {
	this.autorun(function() {
		var user = Meteor.user();
		if (user) {
			if (_.isEmpty(user.services)) {
				if (user.emails && user.emails[0] && user.emails[0].verified) {
					if (user.gamertagScanned.status === 'true' || user.gamertagScanned.status === 'updating') {
						Router.go('home');
					}
					Router.go('confirmGt');
				}
			} else {
				if (user.gamertagScanned.status === 'true' || user.gamertagScanned.status === 'updating') {
					Router.go('home');
				}
				Router.go('confirmGt');
			}
		} else {
			Router.go('signUp');
		}
	});
}

Template.confirmEmail.events({
    'click #resend-submit': function(e) {
        e.preventDefault();
        Meteor.call('sendVerificationEmail');
        return;
    },
    'click #logout': function(event) {
        Meteor.logout(function(error){
            if (error) {
                throw new Meteor.Error("Logout failed");
            } else {
            	Router.go('signUp');
				return;
            }
        })
    },
});