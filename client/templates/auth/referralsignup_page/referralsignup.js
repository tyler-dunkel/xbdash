var socialLoginReferer = Session.set("socialLoginReferer", "");
Template.referralSignUp.events({
	'submit #signupform': function(e) {
		subMana.clear();
		e.preventDefault();

		//validate the form
		var isValid = ValidateForm.validate('#signupform');
		if (!isValid) return;

		//grab values needed to create a user
		var referrerId = Router.current().params.userId;
		var gamertag = $("#gamertag").val();
		var email = $("#email").val();
		var password = $("#password").val();
		var passwordConfirm = $("#password2").val();
		console.log(referrerId);

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
			Meteor.call('userReferred', user, referrerId, function(error, result) {
				console.log('this worked');
			});
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
				Session.set('socialLoginReferer', Router.current().params.userId);
				Router.go('confirmGt');
				console.log(Session.get('socialLoginReferer'));
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
				Session.set('socialLoginReferer', Router.current().params.userId);
				Router.go('confirmGt');
				console.log(Session.get('socialLoginReferer'));
				return;
			}
		});
	}
});