Template.logIn.rendered = function() {
}

Template.logIn.events({
	'submit #loginform': function(e) {
		e.preventDefault();

		//validate the form
		var isValid = ValidateForm.validate('#loginform');
		if (!isValid) return;

		//grab values needed to create a user
		var email = $("#email").val();
		var password = $("#password").val();

		Meteor.call('chkEmail', function(error, result) {
			// check email code
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
        Meteor.loginWithFacebook({}, function(error){
            if (error) {
                throw new Meteor.Error("Facebook login failed");
            } else {
            	Router.go('home');
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