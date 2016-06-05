Template.forgotPasswordApp.created = function() {
	DocHead.removeDocHeadAddedTags();

	var linkInfo = [
		{ "rel": "icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": window.location.href }
	];

	var forgotPasswordMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": "Enter your email to to receive instructions on resetting your password." },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": "Enter your email to to receive instructions on resetting your password." },
		{ "property": "og:image", "content": "https://www.xbdash.com/img/share-default.jpg" },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": "Forgot Password | XBdash - The Personalized Dashboard for Xbox® Gamers" },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": window.location.href },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:description", "content": "Enter your email to to receive instructions on resetting your password." },
		{ "name": "twitter:title", "content": "Forgot Password | XBdash - The Personalized Dashboard for Xbox® Gamers" },
		{ "name": "twitter:image", "content": "https://www.xbdash.com/img/share-default.jpg" }
	];

	DocHead.setTitle("Forgot Password | XBdash - The Personalized Dashboard for Xbox® Gamers");

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}

	for(var i = 0; i < forgotPasswordMeta.length; i++) {
		DocHead.addMeta(forgotPasswordMeta[i]);;
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