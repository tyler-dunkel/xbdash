Meteor.startup(function() {
	ValidateForm.config({
	  debug: true,
	  rootLayout: 'layout'
	});
});

Template.signUp.rendered = function() {
	//var ckbox = new ReactiveVar(false);
	Session.setDefault("signUpCb", false);
}

Template.signUp.events({
	'submit #signupform': function(e) {
		e.preventDefault();

		var isValid = ValidateForm.validate('#signupform');
		if (!isValid) return;
	},
	'change .ckbox': function() {
		//var value = ckbox.get();
		var value = Session.get("signUpCb");
		if (value === true) {
			Session.set("signUpCb", false);
			console.log(value);
			//ckbox.set(false);
		} else {
			Session.set("signUpCb", true);
			console.log(value);
			//ckbox.set(true);
		}
	},
	'blur .form-control': function(e) {
		var input = e.target;
		ValidateForm.validateInput(input);
	},
	'focus .form-control': function(e) {
		ValidateForm.clearInputStatus(e.target);
	}
});

Template.signUpForm.helpers({
	acceptedTerms: function () {
		var value = Session.get("signUpCb");
		//console.log(value + "from helper");
		if (value === true) {
			$(".sign-up-submit").removeClass('disabled');
			console.log(value + "from helper");
		} else {
			$(".sign-up-submit").addClass('disabled');
			console.log(value + "from helper");
		}
	}
});