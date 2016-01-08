Template.confirmGt.created = function() {
	this.autorun(function() {
		var user = Meteor.user();
		if (user) {
			if (_.isEmpty(user.services)) {
				console.log("not social");
				if (user.emails && user.emails[0] && !user.emails[0].verified) {
					console.log("need to confirm email");
					Router.go('confirmEmail');
				}
			} else if (user.gamertagScanned.status === 'true' || user.gamertagScanned.status === 'updating') {
				Router.go('home');
			}
		} else {
			Router.go('signUp');
		}
	});
};

Template.confirmGt.rendered = function() {
	var user = Meteor.user();

	if (Session.get('socialLoginReferer')) {
		Meteor.call('userReferredSocialSignup', user._id, Session.get('socialLoginReferer'), function(error, result) {
			if (error) {
				console.log(error);
				return;
			}
			Session.set('socialLoginReferer', "");
		});
	}
}

Template.confirmGtForm.events({
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
	'submit #gamertagform': function(e) {
		subMana.clear();
		e.preventDefault();

		var isValid = ValidateForm.validate('#gamertagform');
		if (!isValid) return;

		var gamertag = $("#gamertag").val();
		var email = $("#twitter-email").val();

		console.log(email);

		if (email !== undefined) {
			Meteor.call('setTwitterEmail', email, function(error, result) {
				if (typeof error !== 'undefined') {
					sweetAlert({
						title: error.reason,
						text: error.details,
						type: "error",
						confirmButtonColor: "#DD6B55",
						confirmButtonText: "OK",
						closeOnConfirm: false,
						html: true
					});
					return;
				}
			});
		}

		Meteor.call('chkGamertag', gamertag, function(error, result) {
			if (typeof error != 'undefined') {
				sweetAlert({
					title: error.reason || 'Internal server error!',
					text: error.details || 'Server responded with 500.',
					type: "error",
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "OK",
					closeOnConfirm: false,
					html: true
				});
				return;
			}
			if (result.content) {
				Router.go('home');
				Meteor.call('retrieveData', function(error, result) {
					if (result) {
						Meteor.call('sendWelcomeEmail');
						sweetAlert({
							title: 'Your dashboard is complete!',
							text: 'We have finished compiling your data and building your XBdash profile.',
							type: 'success'
							confirmButtonColor: '#138013',
							confirmButtonText: 'OK',
							closeOnConfirm: true,
							html: true
						});
					}
				});
			}
		});
	},
	'blur .form-control': function(e) {
		var input = e.target;
		ValidateForm.validateInput(input);
	},
	'focus .form-control': function(e) {
		ValidateForm.clearInputStatus(e.target);
	}
});

Tracker.autorun(function() {
});