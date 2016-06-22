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

	var confirmEmailPageDescription = "Confirm your email to unlock your dashboard.";
	var confirmEmailPageImage = "https://www.xbdash.com/img/share-default.jpg";
	var confirmEmailPageTitle = "Confirm Your Email | XBdash - The Personalized Dashboard for Xbox® One and Xbox® 360 Gamers";
	var confirmEmailPageUrl = window.location.href;

	var confirmEmailPageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": confirmEmailPageDescription },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": confirmEmailPageDescription },
		{ "property": "og:image", "content": confirmEmailPageImage },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": confirmEmailPageTitle },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": confirmEmailPageUrl },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:url", "content": confirmEmailPageUrl },
		{ "name": "twitter:title", "content": confirmEmailPageTitle },
		{ "name": "twitter:description", "content": confirmEmailPageDescription },
		{ "name": "twitter:image:src", "content": confirmEmailPageImage },
		{ "name": "twitter:site", "content": "@xboxdash" }
	];

	var linkInfo = [
		{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": confirmEmailPageUrl },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
	];

	DocHead.setTitle(confirmEmailPageTitle);

	for(var i = 0; i < confirmEmailPageMeta.length; i++) {
		DocHead.addMeta(confirmEmailPageMeta[i]);;
	}

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
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