Template.forgotPasswordApp.created = function() {
	DocHead.removeDocHeadAddedTags();

	var forgotPasswordPageDescription = "Enter your email to to receive instructions on resetting your password.";
	var forgotPasswordPageImage = "https://www.xbdash.com/img/share-default.jpg";
	var forgotPasswordPageTitle = "Forgot Password | XBdash - The Personalized Dashboard for Xbox® One and Xbox® 360 Gamers";
	var forgotPasswordPageUrl = window.location.href;

	var forgotPasswordPageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": forgotPasswordPageDescription },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": forgotPasswordPageDescription },
		{ "property": "og:image", "content": forgotPasswordPageImage },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": forgotPasswordPageTitle },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": forgotPasswordPageUrl },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:url", "content": forgotPasswordPageUrl },
		{ "name": "twitter:title", "content": forgotPasswordPageTitle },
		{ "name": "twitter:description", "content": forgotPasswordPageDescription },
		{ "name": "twitter:image:src", "content": forgotPasswordPageImage },
		{ "name": "twitter:site", "content": "@xboxdash" }
	];

	var linkInfo = [
		{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": forgotPasswordPageUrl },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
	];

	DocHead.setTitle(forgotPasswordPageTitle);

	for(var i = 0; i < forgotPasswordPageMeta.length; i++) {
		DocHead.addMeta(forgotPasswordPageMeta[i]);;
	}
	
	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}
}

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