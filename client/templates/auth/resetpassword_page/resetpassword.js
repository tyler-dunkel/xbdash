var doneCallback;

Template.resetPassword.created = function() {
	DocHead.removeDocHeadAddedTags();

	var linkInfo = [
		{ rel: "icon", type: "image/x-icon", href: "https://www.xbdash.com/img/favicon.ico" },
		{ rel: "canonical", href: window.location.href }
	];

	var resetPasswordMeta = [
		{ name: "description", content: "Please enter your password and confirm to reset your password." },
		{ property: "fb:app_id", content: Meteor.settings.public.facebookAppId },
		{ property: "og:description", content: "Please enter your password and confirm to reset your password." },
		{ property: "og:image", content: "https://www.xbdash.com/img/share-default.jpg" },
		{ property: "og:locale", content: "en_US" },
		{ property: "og:site_name", content: "XBdash" },
		{ property: "og:title", content: "Reset Password - XBdash - The Personalized Dashboard for Xbox® Gamers" },
		{ property: "og:type", content: "website" },
		{ property: "og:url", content: window.location.href },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:description", content: "Please enter your password and confirm to reset your password." },
		{ name: "twitter:title", content: "Reset Password - XBdash - The Personalized Dashboard for Xbox® Gamers" },
		{ name: "twitter:image", content: "https://www.xbdash.com/img/share-default.jpg" }
	];

	DocHead.setTitle("Reset Password - XBdash - The Personalized Dashboard for Xbox® Gamers");

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}

	for(var i = 0; i < resetPasswordMeta.length; i++) {
		DocHead.addMeta(resetPasswordMeta[i]);;
	}
}

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