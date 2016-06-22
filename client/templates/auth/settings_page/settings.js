Template.settingsApp.created = function() {
	DocHead.removeDocHeadAddedTags();

	var settingsPageDescription = "Change your settings and save.";
	var settingsPageImage = "https://www.xbdash.com/img/share-default.jpg";
	var settingsPageTitle = "Your Settings | XBdash - The Personalized Dashboard for Xbox® One and Xbox® 360 Gamers";
	var settingsPageUrl = window.location.href;

	var settingsPageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": settingsPageDescription },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": settingsPageDescription },
		{ "property": "og:image", "content": settingsPageImage },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": settingsPageTitle },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": settingsPageUrl },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:url", "content": settingsPageUrl },
		{ "name": "twitter:title", "content": settingsPageTitle },
		{ "name": "twitter:description", "content": settingsPageDescription },
		{ "name": "twitter:image:src", "content": settingsPageImage },
		{ "name": "twitter:site", "content": "@xboxdash" }
	];

	var linkInfo = [
		{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": settingsPageUrl },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
	];

	DocHead.setTitle(settingsPageTitle);

	for(var i = 0; i < settingsPageMeta.length; i++) {
		DocHead.addMeta(settingsPageMeta[i]);;
	}

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
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