var doneCallback;

Template.resetPassword.created = function() {
	DocHead.removeDocHeadAddedTags();

	var resetPasswordPageDescription = "Please enter your new password and confirm to reset.";
	var resetPasswordPageImage = "https://www.xbdash.com/img/share-default.jpg";
	var resetPasswordPageTitle = "Reset Password | XBdash - The Personalized Dashboard for Xbox® One and Xbox® 360 Gamers";
	var resetPasswordPageUrl = window.location.href;

	var resetPasswordPageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": resetPasswordPageDescription },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": resetPasswordPageDescription },
		{ "property": "og:image", "content": resetPasswordPageImage },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": resetPasswordPageTitle },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": resetPasswordPageUrl },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:url", "content": resetPasswordPageUrl },
		{ "name": "twitter:title", "content": resetPasswordPageTitle },
		{ "name": "twitter:description", "content": resetPasswordPageDescription },
		{ "name": "twitter:image:src", "content": resetPasswordPageImage },
		{ "name": "twitter:site", "content": "@xboxdash" }
	];

	var linkInfo = [
		{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": resetPasswordPageUrl },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
	];

	DocHead.setTitle(resetPasswordPageTitle);

	for(var i = 0; i < resetPasswordPageMeta.length; i++) {
		DocHead.addMeta(resetPasswordPageMeta[i]);;
	}

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
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