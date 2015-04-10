// Meteor.startup(function() {
// 	ValidateForm.config({
// 	  debug: false,
// 	  rootLayout: 'layout'
// 	});
// });

Template.signUp.rendered = function() {
	//var ckbox = new ReactiveVar(false);
	Session.setDefault("signUpCb", false);
}

Template.signUp.events({
	'submit #signupform': function(e) {
		e.preventDefault();

		var isValid = ValidateForm.validate('#signupform');
		if (!isValid) return;

		var gamertag = $("#gamertag").val();
		var email = $("#email").val();
		var password = $("#password").val();
		var passwordConfirm = $("#password2").val();

		if (password !== passwordConfirm) return;

		Meteor.call('chkGamertag', gamertag, function(error, result) {
			if (result) { 
				var user = {username: gamertag, email: email, password: password, profile: {xuid: result.content}};
				Accounts.createUser(user, function(error) {
					if (error) {
						console.log(error);
					} else {
						Router.go('loading');
						Meteor.call('retrieveData', user, function(error, result) {
							console.log(result);
							Router.go('home');
						});
					}
				});
			}
		});
	},
	'click .ckbox': function() {
		var value = $(event.target).is(':checked');
		Session.set("signUpCb", value);
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
	var value = Session.get("signUpCb");
		if (value === true) {
			$(".sign-up-submit").removeClass('disabled');
		} else {
			$(".sign-up-submit").addClass('disabled');
		}
});

