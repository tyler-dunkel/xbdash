Template.settingsApp.rendered = function() {
}

Template.settingsApp.events({
	'submit #change-password-form': function(e) {
		e.preventDefault();
		
		var isValid = ValidateForm.validate('#change-password');
		if (!isValid) return;
		var oldPassword = $("#old-password").val();
		var newPassword = $("#password").val();
		var newPasswordConfirm = $("#password2").val();
		if (newPassword !== newPasswordConfirm) return;

		Accounts.changePassword(oldPassword, newPasswordConfirm, function(error) {
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
				return;
			} else {
    			sweetAlert({
					title: "Password Changed",
					text: "Your password has been changed!",
					type: "success",
					confirmButtonColor: "#138013",
					confirmButtonText: "OK",
					closeOnConfirm: true,
				});
				Router.go('home');
			}
		});
	},
	'submit #delete-account-form': function(e) {
		e.preventDefault();

		$('button#delete').addClass('disabled');

		Meteor.call('deleteUser', function(error) {
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
				return;
			} else {
				sweetAlert({
					title: "Account Deleted",
					text: "Your account has been deleted. It's always sad to see someone go. Thank you for using XBdash!",
					type: "success",
					confirmButtonColor: "#138013",
					confirmButtonText: "OK",
					closeOnConfirm: true,
				});
				Router.go('signUp');
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