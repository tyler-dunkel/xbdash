Template.signUp.created = function() {
};

Template.signUp.rendered = function() {
}

Template.signUp.events({
	'submit #signupform': function(e) {
		subMana.clear();
		e.preventDefault();

		//validate the form
		var isValid = ValidateForm.validate('#signupform');
		if (!isValid) return;

		//grab values needed to create a user
		var gamertag = $("#gamertag").val();
		var email = $("#email").val();
		var password = $("#password").val();
		var passwordConfirm = $("#password2").val();

		if (password !== passwordConfirm) return;

		var user = {username: gamertag, email: email, password: password, profile: {}};

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
			}
			Router.go('confirmEmail');
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