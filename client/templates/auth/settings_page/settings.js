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
	'click a#delete': function(e) {
		e.preventDefault();

		$('a#delete').addClass('disabled');

		sweetAlert({
			title: "Are you sure?",
			text: 'By entering "DELETE", you confirm that your account will be deleted. You will not be able to recover your account unless you sign up again.',
			type: "input",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Yes, delete my account!",
			cancelButtonText: "No, I love XBdash!",
			closeOnConfirm: false,
			closeOnCancel: true,
			animation: "slide-from-top",
			inputPlaceholder: 'Type "DELETE" to confirm your account deletion'
		}, function(inputValue) {
			if (inputValue === false) {
				$('a#delete').removeClass('disabled');
				return false;
			}
			if (inputValue === "") {
				sweetAlert.showInputError("You left the field blank.");
				return false;
			}
			if (inputValue === "DELETE") {
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
						$('a#delete').removeClass('disabled');
						return;
					} else {
						sweetAlert({
							title: "Account Deleted",
							text: "Your account has been deleted. It's always sad to see someone go. Thank you for using XBdash!",
							type: "success",
							confirmButtonColor: "#138013",
							confirmButtonText: "OK",
							closeOnConfirm: true,
							closeOnCancel: true
						});
						Router.go('signUp');
					}
				});
			} else {
				sweetAlert.showInputError("The input is wrong.");
				return false;
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