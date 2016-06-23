Template.logIn.created = function() {
	DocHead.removeDocHeadAddedTags();

	var logInPageDescription = "Log in to your account.";
	var logInPageImage = "https://www.xbdash.com/img/share-default.jpg";
	var logInPageTitle = "Log In | XBdash - The Personalized Dashboard for Xbox® One and Xbox® 360 Gamers";
	var logInPageUrl = window.location.href;

	var logInPageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": logInPageDescription },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": logInPageDescription },
		{ "property": "og:image", "content": logInPageImage },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": logInPageTitle },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": logInPageUrl },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:url", "content": logInPageUrl },
		{ "name": "twitter:title", "content": logInPageTitle },
		{ "name": "twitter:description", "content": logInPageDescription },
		{ "name": "twitter:image:src", "content": logInPageImage },
		{ "name": "twitter:site", "content": "@xboxdash" }
	];

	var linkInfo = [
		{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": logInPageUrl },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
	];

	DocHead.setTitle(logInPageTitle);

	for(var i = 0; i < logInPageMeta.length; i++) {
		DocHead.addMeta(logInPageMeta[i]);;
	}

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}
}

Template.logIn.events({
	'submit #loginform': function(e) {
		subMana.clear();
		e.preventDefault();

		var isValid = ValidateForm.validate('#loginform');
		if (!isValid) return;

		var email = $("#email").val();
		var password = $("#password").val();

		Meteor.loginWithPassword(email, password, function(error) {
			if (error) {
				sweetAlert({
					title: error.reason,
					text: error.details,
					type: "error",
					closeOnConfirm: true
				});
			} else {
				var user = Meteor.user();
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
	'click #facebook-login': function(event) {
		subMana.clear();
		Meteor.loginWithFacebook({}, function(error){
			if (error) {
				throw new Meteor.Error("Facebook login failed");
			} else {
				Router.go('home');
				return;
			}
		});
	},
	'click #twitter-login': function(event) {
		subMana.clear();
		Meteor.loginWithTwitter({}, function(error){
			if (error) {
				throw new Meteor.Error("Twitter login failed.");
			} else {
				Router.go('home');
				return;
			}
		});
	},
	'click #logout': function(event) {
		Meteor.logout(function(error){
			if (error) {
				throw new Meteor.Error("Logout failed");
			}
		})
	}
});