Template.logIn.events({
	'submit #loginform': function(e) {
		subMana.clear();
		e.preventDefault();

		var isValid = ValidateForm.validate('#loginform');
		if (!isValid) return;

		var email = $("#email").val();
		var password = $("#password").val();

		Meteor.loginWithPassword(email, password, function(error) {
			if (error) {
				sweetAlert({
					title: error.reason,
					text: error.details,
					type: "error",
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "OK",
					closeOnConfirm: false
				});
			}
			else {
				var user = Meteor.user();
				Router.go('home');
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
            	Router.go('home');
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