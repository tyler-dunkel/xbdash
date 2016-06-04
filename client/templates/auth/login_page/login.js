Template.logIn.created = function() {
	DocHead.removeDocHeadAddedTags();

	var linkInfo = [
		{ rel: "icon", type: "image/x-icon", href: "https://www.xbdash.com/img/favicon.ico" },
		{ rel: "canonical", href: window.location.href }
	];

	var logInMeta = [
		{ name: "description", content: "Log in to your account." },
		{ property: "fb:app_id", content: Meteor.settings.public.facebookAppId },
		{ property: "og:description", content: "Log in to your account." },
		{ property: "og:image", content: "https://www.xbdash.com/img/share-default.jpg" },
		{ property: "og:locale", content: "en_US" },
		{ property: "og:site_name", content: "XBdash" },
		{ property: "og:title", content: "Log In - XBdash - The Personalized Dashboard for Xbox® Gamers" },
		{ property: "og:type", content: "website" },
		{ property: "og:url", content: window.location.href },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:description", content: "Log in to your account." },
		{ name: "twitter:title", content: "Log In - XBdash - The Personalized Dashboard for Xbox® Gamers" },
		{ name: "twitter:image", content: "https://www.xbdash.com/img/share-default.jpg" }
	];

	DocHead.setTitle("Log In - XBdash - The Personalized Dashboard for Xbox® Gamers");

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}

	for(var i = 0; i < logInMeta.length; i++) {
		DocHead.addMeta(logInMeta[i]);;
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