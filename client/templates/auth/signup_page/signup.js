Template.signUp.created = function() {
	this.autorun(function() {
		var user = Meteor.user();
		if (user) {
			if (_.isEmpty(user.services)) {
				if (user.emails && user.emails[0] && !user.emails[0].verified) {
					Router.go('confirmEmail');
				}
			} else if (user.gamertagScanned) {
				Router.go('home');
			}
		}
	});
};

Template.signUpForm.events({
	'submit #signupform': function(e) {
		subMana.clear();
		e.preventDefault();

		var isValid = ValidateForm.validate('#signupform');
		if (!isValid) return;

		var email = $("#email").val();
		var password = $("#password").val();
		var passwordConfirm = $("#password2").val();
		if (password !== passwordConfirm) return;

		var user = {email: email, password: password, profile: {}};
		var referralToken = Router.current().params.query.referraltoken;

		Accounts.createUser(user, function(error, result) {
			if (error) {
				sweetAlert({
					title: error.reason,
					text: error.details,
					type: "error"
				});
				Router.go('signUp');
				return;
			} else {
				if (referralToken) {
					Meteor.call('resolveReferralToken', referralToken, function() {
					});
				}
				Router.go('confirmEmail');
			}
		});
	},
	'blur .form-control': function(e) {
		var input = e.target;
		ValidateForm.validateInput(input);
	},
	'focus .form-control': function(e) {
		ValidateForm.clearInputStatus(e.target);
	},
	'click #facebook-login': function(event) {
		subMana.clear();
		var referralToken = Router.current().params.query.referraltoken;
        Meteor.loginWithFacebook({}, function(error){
            if (error) {
                throw new Meteor.Error("Facebook login failed");
            } else {
            	if (referralToken) {
					Meteor.call('resolveReferralToken', referralToken, function() {
					});
				}
            	Router.go('confirmGt');
				return;
            }
        });
    },
    'click #twitter-login': function(event) {
    	subMana.clear();
    	var referralToken = Router.current().params.query.referraltoken;
        Meteor.loginWithTwitter({}, function(error){
            if (error) {
                throw new Meteor.Error("Twitter login failed.");
            } else {
            	if (referralToken) {
					Meteor.call('resolveReferralToken', referralToken, function() {
					});
				}
            	Router.go('confirmGt');
				return;
            }
        });
    },
    'click #logout': function(event) {
        Meteor.logout(function(error){
            if (error) {
                throw new Meteor.Error("Logout failed");
            }
        });
    }
});

Tracker.autorun(function() {
});
