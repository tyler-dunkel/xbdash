Template.signUp.created = function() {
	this.autorun(function() {
		var user = Meteor.user();
		if (user) {
			if (_.isEmpty(user.services)) {
				if (user.emails && user.emails[0] && !user.emails[0].verified) {
					Router.go('confirmEmail');
				}
			} else if (user.gamertagScanned) {
				Router.go('home');
			}
		}
	});

	DocHead.removeDocHeadAddedTags();

	var signUpPageDescription = "Sign up for XBdash and unlock your personalized dashboard.";
	var signUpPageImage = "https://www.xbdash.com/img/share-default.jpg";
	var signUpPageTitle = "Sign Up For Free | XBdash - The Personalized Dashboard for Xbox® Gamers";
	var signUpPageUrl = window.location.href;

	var signUpPageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": signUpPageDescription },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": signUpPageDescription },
		{ "property": "og:image", "content": signUpPageImage },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": signUpPageTitle },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": signUpPageUrl },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:url", "content": signUpPageUrl },
		{ "name": "twitter:title", "content": signUpPageTitle },
		{ "name": "twitter:description", "content": signUpPageDescription },
		{ "name": "twitter:image:src", "content": signUpPageImage },
		{ "name": "twitter:site", "content": "@xboxdash" }
	];

	var linkInfo = [
		{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": signUpPageUrl },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
	];

	DocHead.setTitle(signUpPageTitle);

	for(var i = 0; i < signUpPageMeta.length; i++) {
		DocHead.addMeta(signUpPageMeta[i]);;
	}

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}
};

Template.signUpForm.events({
	'submit #signupform': function(e) {
		subMana.clear();
		e.preventDefault();

		var isValid = ValidateForm.validate('#signupform');
		if (!isValid) return;

		var email = $("#email").val();
		var password = $("#password").val();
		var passwordConfirm = $("#password2").val();
		if (password !== passwordConfirm) return;

		var user = {email: email, password: password, profile: {}};
		var referralToken = Router.current().params.query.referraltoken;

		Accounts.createUser(user, function(error, result) {
			if (error) {
				sweetAlert({
					title: error.reason,
					text: error.details,
					type: "error"
				});
				Router.go('signUp');
				return;
			} else {
				if (referralToken) {
					Meteor.call('resolveReferralToken', referralToken, function() {
					});
				}
				Router.go('confirmEmail');
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
		var referralToken = Router.current().params.query.referraltoken;
		Meteor.loginWithFacebook({}, function(error){
			if (error) {
				throw new Meteor.Error("Facebook login failed");
			} else {
				if (referralToken) {
					Meteor.call('resolveReferralToken', referralToken, function() {
					});
				}
				Router.go('confirmGt');
				return;
			}
		});
	},
	'click #twitter-login': function(event) {
		subMana.clear();
		var referralToken = Router.current().params.query.referraltoken;
		Meteor.loginWithTwitter({}, function(error){
			if (error) {
				throw new Meteor.Error("Twitter login failed.");
			} else {
				if (referralToken) {
					Meteor.call('resolveReferralToken', referralToken, function() {
					});
				}
				Router.go('confirmGt');
				return;
			}
		});
	},
	'click #logout': function(event) {
		Meteor.logout(function(error){
			if (error) {
				throw new Meteor.Error("Logout failed");
			}
		});
	}
});