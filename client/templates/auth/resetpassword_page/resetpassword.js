var doneCallback;

Template.resetPassword.rendered = function() {
	var token = Router.current().params.token;
	Session.set('resetPasswordToken', token);
	if (doneCallback) {
		doneCallback();
	}
}

Template.resetPasswordForm.events({
	'submit #reset-password-form': function(e) {
	    e.preventDefault();
	    
		var isValid = ValidateForm.validate('#reset-password-form');
		if (!isValid) return;

		var newPassword = $("#password").val();
		var newPasswordConfirm = $("#password2").val();

		if (newPassword !== newPasswordConfirm) return;

    	Accounts.resetPassword(Session.get('resetPasswordToken'), newPasswordConfirm, function(error) {
    		if (error) {
    			sweetAlert({
					title: error.reason,
					text: error.message,
					type: "error"
				},
				function() {
					Router.go('forgotPassword');
				});
    			return;
    		} else {
    			Session.set('resetPasswordToken', '');

    			sweetAlert({
					title: "Password Reset",
					text: "Your password has been reset. Welcome back!",
					type: "success",
					confirmButtonColor: "#138013"
				});

    			if (doneCallback) {
    				doneCallback();
    			}
	          	Router.go('home');
      		}
      	});
      	return false;
	},
	'blur .form-control': function(e) {
		var input = e.target;
		ValidateForm.validateInput(input);
	},
	'focus .form-control': function(e) {
		ValidateForm.clearInputStatus(e.target);
	}
});