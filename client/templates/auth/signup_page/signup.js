Template.signUp.created = function() {
	this.autorun(function() {
		var user = Meteor.user();
		console.log(user);
		if (user) {
			if (_.isEmpty(user.services)) {
				console.log("not social");
				if (user.emails && user.emails[0] && !user.emails[0].verified) {
					console.log("need to confirm email");
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
		
		Accounts.createUser(user, function(error, result) {
			if (error) {
				sweetAlert({
					title: error.reason,
					text: error.details,
					type: "error",
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "OK",
					closeOnConfirm: false,
					html: true
				});
				Router.go('signUp');
				return;
			} else {
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
        Meteor.loginWithFacebook({}, function(error){
            if (error) {
                throw new Meteor.Error("Facebook login failed");
            } else {
            	Router.go('confirmGt');
				return;
            }
        });
    },
    'click #twitter-login': function(event) {
    	subMana.clear();
        Meteor.loginWithTwitter({}, function(error){
            if (error) {
                throw new Meteor.Error("Twitter login failed.");
            } else {
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
        })
    }
});

Tracker.autorun(function() {
});