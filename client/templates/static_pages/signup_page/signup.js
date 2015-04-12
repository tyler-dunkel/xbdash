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
		Router.go('loading');
		Meteor.call('chkGamertag', gamertag, function(error, result) {
			
			if (typeof error != 'undefined') {
				console.log(error);
				sweetAlert({
					title: "Gamertag not found",
					text: "If you are sure you entered the correct gamertag, please contact us!",
					type: "error",
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "OK",
					closeOnConfirm: false,
					html: false
				});
				Router.go('signUp');
				return;
			}
			if (result.content) {
				console.log("got it");
				var user = {username: gamertag, email: email, password: password, profile: {xuid: result.content}};
				Accounts.createUser(user, function(error) {
					if (error) {
						console.log(error);
					} else {
						Meteor.call('retrieveData', user, function(error, result) {
							console.log(result);
							Router.go('home');
						});
					}
				});
			}
			Meteor._debug("howd it get here?"); 
		});
	},
	'click .ckbox': function(event) {
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

