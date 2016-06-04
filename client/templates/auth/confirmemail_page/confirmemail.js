Template.confirmEmail.created = function() {
	this.autorun(function() {
		var user = Meteor.user();
		if (user) {
			if (_.isEmpty(user.services)) {
				if (user.emails && user.emails[0] && user.emails[0].verified) {
					if (user.gamertagScanned.status === 'true' || user.gamertagScanned.status === 'updating') {
						Router.go('home');
					}
					Router.go('confirmGt');
				}
			} else {
				if (user.gamertagScanned.status === 'true' || user.gamertagScanned.status === 'updating') {
					Router.go('home');
				}
				Router.go('confirmGt');
			}
		} else {
			Router.go('signUp');
		}
	});

	DocHead.removeDocHeadAddedTags();

	var linkInfo = [
		{ rel: "icon", type: "image/x-icon", href: "https://www.xbdash.com/img/favicon.ico" },
		{ rel: "canonical", href: window.location.href }
	];

	var confirmEmailMeta = [
		{ name: "description", content: "Confirm your email to unlock your dashboard." },
		{ property: "fb:app_id", content: Meteor.settings.public.facebookAppId },
		{ property: "og:description", content: "Confirm your email to unlock your dashboard." },
		{ property: "og:image", content: "https://www.xbdash.com/img/share-default.jpg" },
		{ property: "og:locale", content: "en_US" },
		{ property: "og:site_name", content: "XBdash" },
		{ property: "og:title", content: "Confirm Your Email - XBdash - The Personalized Dashboard for Xbox® Gamers" },
		{ property: "og:type", content: "website" },
		{ property: "og:url", content: window.location.href },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:description", content: "Confirm your email to unlock your dashboard." },
		{ name: "twitter:title", content: "Confirm Your Email - XBdash - The Personalized Dashboard for Xbox® Gamers" },
		{ name: "twitter:image", content: "https://www.xbdash.com/img/share-default.jpg" }
	];

	DocHead.setTitle("Confirm Your Email - XBdash - The Personalized Dashboard for Xbox® Gamers");

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}

	for(var i = 0; i < confirmEmailMeta.length; i++) {
		DocHead.addMeta(confirmEmailMeta[i]);;
	}
}

Template.confirmEmail.events({
	'click #resend-submit': function(e) {
		e.preventDefault();
		Meteor.call('sendVerificationEmail');
		return;
	},
	'click #logout': function(event) {
		Meteor.logout(function(error){
			if (error) {
				throw new Meteor.Error("Logout failed");
			} else {
				Router.go('signUp');
				return;
			}
		})
	},
});