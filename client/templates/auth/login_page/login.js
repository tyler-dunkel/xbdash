function updateUserData(email) {
	Meteor.setInterval(function() {
		Meteor.call('testMethod', function(error, result) {
		});
	}, 1000);
}

Template.logIn.rendered = function() {
}

Template.logInForm.helpers({
	chkEmail: function () {
		//var userId = Meteor.userId();
		console.log(Meteor.user().services);
		//console.log(Meteor.user().services.facebook.email);
		if (!Meteor.user().emails) {
			if (Meteor.user().services.twitter.screenName) {
				return true;
			}
		}
		return false;
	},
	chkSocial: function () {
		if (!Meteor.user().services.twitter || 
			!Meteor.user().services.facebook) {
			return true;
		}
		return false;
	},
	chkFacebook: function () {
		if (Meteor.user().services.facebook) {
			return true;
		}
		return false;
	},
	chkTwitter: function () {
		if (Meteor.user().services.twitter) {
			return true;
		}
		return false;
	}
});

Template.logIn.events({
	'submit #loginform': function(e) {
		e.preventDefault();

		//validate the form
		var isValid = ValidateForm.validate('#loginform');
		if (!isValid) return;

		//grab values needed to create a user
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
					closeOnConfirm: false,
					html: true
				});
			}
			else {
				updateUserData(email);
				router.go('home');
			}
		})
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
    'click #twitter-login': function(event) {
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
