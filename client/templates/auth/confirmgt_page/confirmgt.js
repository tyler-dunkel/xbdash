Template.confirmGt.created = function() {
	this.autorun(function() {
		var user = Meteor.user();
		if (user) {
			if (_.isEmpty(user.services)) {
				if (user.emails && user.emails[0] && !user.emails[0].verified) {
					Router.go('confirmEmail');
				}
			} else if (user.gamertagScanned.status === 'true' || user.gamertagScanned.status === 'updating') {
				Router.go('home');
			}
		} else {
			Router.go('signUp');
		}
	});

	DocHead.removeDocHeadAddedTags();

	var confirmGtPageDescription = "Confirm your gamertag to start scanning your history.";
	var confirmGtPageImage = "https://www.xbdash.com/img/share-default.jpg";
	var confirmGtPageTitle = "Confirm Your Gamertag | XBdash - The Personalized Dashboard for Xbox® One and Xbox® 360 Gamers";
	var confirmGtPageUrl = window.location.href;

	var confirmGtPageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": confirmGtPageDescription },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": confirmGtPageDescription },
		{ "property": "og:image", "content": confirmGtPageImage },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": confirmGtPageTitle },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": confirmGtPageUrl },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:url", "content": confirmGtPageUrl },
		{ "name": "twitter:title", "content": confirmGtPageTitle },
		{ "name": "twitter:description", "content": confirmGtPageDescription },
		{ "name": "twitter:image:src", "content": confirmGtPageImage },
		{ "name": "twitter:site", "content": "@xboxdash" }
	];

	var linkInfo = [
		{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": confirmGtPageUrl },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
	];

	DocHead.setTitle(confirmGtPageTitle);

	for(var i = 0; i < confirmGtPageMeta.length; i++) {
		DocHead.addMeta(confirmGtPageMeta[i]);;
	}

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}
};

Template.confirmGtForm.events({
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
	'submit #gamertagform': function(e) {
		subMana.clear();
		e.preventDefault();

		var isValid = ValidateForm.validate('#gamertagform');
		if (!isValid) return;

		var gamertag = $("#gamertag").val();
		var email = $("#twitter-email").val();

		if (email !== undefined) {
			Meteor.call('setTwitterEmail', email, function(error, result) {
				if (typeof error !== 'undefined') {
					sweetAlert({
						title: error.reason,
						text: error.details,
						type: "error"
					});
					return;
				}
			});
		}

		sweetAlert({
			html: "<span style='font-size: 1.5em;'>Are you sure you spelled your gamertag <strong>" + gamertag + "</strong> correctly?</span>",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#138013",
			cancelButtonColor: "#dd3333",
			confirmButtonText: "Yes, let's do this!",
			cancelButtonText: "No, it's misspelled.",
			closeOnConfirm: true,
			closeOnCancel: true
		}).then(function(isConfirm) {
			if (isConfirm) {
				Meteor.call('chkGamertag', gamertag, function(error, result) {
					if (typeof error != 'undefined') {
						sweetAlert({
							title: error.reason || 'Oops! There was an error.',
							text: error.details || 'Please verify your gamertag is spelled correctly and submit again.',
							type: "error"
						});
						return;
					}
					if (result.content) {
						Meteor.call('retrieveData', function(error, result) {
							if (result) {
								Router.go('home');
								sweetAlert({
									title: 'Gamertag Scan in Progress',
									text: 'When scanning is complete, your Dashboard page will populate and you will receive an email with a summary of your initial scanned data.',
									customClass: 'welcome-overlay',
									allowOutsideClick: false,
									allowEscapeKey: false,
									confirmButtonText: 'Let\'s Go!',
									confirmButtonColor: '#138013',
									width: 600
								});
							}
						});
					}
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
