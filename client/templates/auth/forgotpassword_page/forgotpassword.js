Template.forgotPasswordApp.events({
	'submit #forgotpassword-form': function(e) {
		e.preventDefault();
		
		var isValid = ValidateForm.validate('#forgotpassword-form');
		if (!isValid) return;

		var email = $("#email").val();

		Accounts.forgotPassword({email: email}, function(error) {
			if (error) {
				sweetAlert({
					title: error.reason,
					text: error.details,
					type: "error"
				});
				return;
			} else {
				sweetAlert({
					title: "Forgot Password",
					text: "Please check your email for password reset instructions.",
					type: "success",
					confirmButtonColor: "#138013"
				},
				function() {
					Router.go('home');
				});
			}
		});
	},
	'blur .form-control': function(e) {
		var input = e.target;
		ValidateForm.validateInput(input);
	},
	'focus .form-control': function(e) {
		ValidateForm.clearInputStatus(e.target);
	}
});