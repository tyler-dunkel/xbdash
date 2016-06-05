Template.settingsApp.created = function() {
	DocHead.removeDocHeadAddedTags();

	var linkInfo = [
		{ "rel": "icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": window.location.href }
	];

	var settingsAppMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": "Change your settings and save." },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": "Change your settings and save." },
		{ "property": "og:image", "content": "https://www.xbdash.com/img/share-default.jpg" },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": "Your Settings - XBdash - The Personalized Dashboard for Xbox® Gamers" },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": window.location.href },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:description", "content": "Change your settings and save." },
		{ "name": "twitter:title", "content": "Your Settings - XBdash - The Personalized Dashboard for Xbox® Gamers" },
		{ "name": "twitter:image", "content": "https://www.xbdash.com/img/share-default.jpg" }
	];

	DocHead.setTitle("Your Settings - XBdash - The Personalized Dashboard for Xbox® Gamers");

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}

	for(var i = 0; i < settingsAppMeta.length; i++) {
		DocHead.addMeta(settingsAppMeta[i]);;
	}
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
					type: "error"
				});
				return;
			} else {
    			sweetAlert({
					title: "Password Changed",
					text: "Your password has been changed!",
					type: "success",
					confirmButtonColor: "#138013"
				});
				Router.go('home');
			}
		});
	},
	// 'click a#delete': function(e) {
	// 	e.preventDefault();

	// 	$('a#delete').addClass('disabled');

	// 	sweetAlert({
	// 		title: "Are you sure?",
	// 		text: 'By entering "DELETE", you confirm that your account will be deleted. You will not be able to recover your account unless you sign up again.',
	// 		type: "input",
	// 		showCancelButton: true,
	// 		confirmButtonColor: "#DD6B55",
	// 		confirmButtonText: "Yes, delete my account!",
	// 		cancelButtonText: "No, I love XBdash!",
	// 		closeOnConfirm: false,
	// 		closeOnCancel: true,
	// 		animation: "slide-from-top",
	// 		inputPlaceholder: 'Type "DELETE" to confirm your account deletion'
	// 	}, function(inputValue) {
	// 		if (inputValue === false) {
	// 			$('a#delete').removeClass('disabled');
	// 			return false;
	// 		}
	// 		if (inputValue === "") {
	// 			sweetAlert.showInputError("You left the field blank.");
	// 			return false;
	// 		}
	// 		if (inputValue === "DELETE") {
	// 			Meteor.call('deleteUser', function(error) {
	// 				if (error) {
	// 					sweetAlert({
	// 						title: error.reason,
	// 						text: error.details,
	// 						type: "error",
	// 						confirmButtonColor: "#DD6B55",
	// 						confirmButtonText: "OK",
	// 						closeOnConfirm: false,
	// 						html: true
	// 					});
	// 					$('a#delete').removeClass('disabled');
	// 					return;
	// 				} else {
	// 					sweetAlert({
	// 						title: "Account Deleted",
	// 						text: "Your account has been deleted. It's always sad to see someone go. Thank you for using XBdash!",
	// 						type: "success",
	// 						confirmButtonColor: "#138013",
	// 						confirmButtonText: "OK",
	// 						closeOnConfirm: true,
	// 						closeOnCancel: true
	// 					});
	// 					Router.go('signUp');
	// 				}
	// 			});
	// 		} else {
	// 			sweetAlert.showInputError("The input is wrong.");
	// 			return false;
	// 		}
	// 	});
	// },
	'blur .form-control': function(e) {
		var input = e.target;
		ValidateForm.validateInput(input);
	},
	'focus .form-control': function(e) {
		ValidateForm.clearInputStatus(e.target);
	}
});