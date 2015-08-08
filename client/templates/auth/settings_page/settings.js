Template.settingsApp.events({
	'click #delete': function(e) {
		e.preventDefault();
		$('#delete').addClass('disabled');
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
				Router.go('signUp');
			}
		});
	},
	'submit #change-password': function(e) {
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
});