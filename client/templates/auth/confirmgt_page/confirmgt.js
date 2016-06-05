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

	var linkInfo = [
		{ "rel": "icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": window.location.href }
	];

	var confirmGtMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": "Confirm your gamertag to start scanning your history." },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": "Confirm your gamertag to start scanning your history." },
		{ "property": "og:image", "content": "https://www.xbdash.com/img/share-default.jpg" },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": "Confirm Your Gamertag - XBdash - The Personalized Dashboard for Xbox® Gamers" },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": window.location.href },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:description", "content": "Confirm your gamertag to start scanning your history." },
		{ "name": "twitter:title", "content": "Confirm Your Gamertag - XBdash - The Personalized Dashboard for Xbox® Gamers" },
		{ "name": "twitter:image", "content": "https://www.xbdash.com/img/share-default.jpg" }
	];

	DocHead.setTitle("Confirm Your Gamertag - XBdash - The Personalized Dashboard for Xbox® Gamers");

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}

	for(var i = 0; i < confirmGtMeta.length; i++) {
		DocHead.addMeta(confirmGtMeta[i]);;
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
									title: 'Staying Engaged on XBdash',
									html: Blaze.toHTML(Template.welcomeOverlay),
									customClass: 'welcome-overlay',
									allowOutsideClick: false,
									allowEscapeKey: false,
									confirmButtonText: 'Let\'s Go!',
									confirmButtonColor: '#138013',
									width: 1000
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
