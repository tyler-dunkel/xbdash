Template.termsConditions.created = function() {
	DocHead.removeDocHeadAddedTags();

	var linkInfo = [
		{ "rel": "icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": window.location.href }
	];

	var termsConditionsMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": "Review our terms and conditions." },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": "Review our terms and conditions." },
		{ "property": "og:image", "content": "https://www.xbdash.com/img/share-default.jpg" },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": "Terms & Conditions | XBdash - The Personalized Dashboard for Xbox® Gamers" },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": window.location.href }
	];

	DocHead.setTitle("Terms & Conditions | XBdash - The Personalized Dashboard for Xbox® Gamers");

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}

	for(var i = 0; i < termsConditionsMeta.length; i++) {
		DocHead.addMeta(termsConditionsMeta[i]);;
	}
}

Template.termsConditions.events({
	'click #contact-us': function(e) {
		e.preventDefault();
		sweetAlert({
			title: 'Contact Us',
			html: Blaze.toHTML(Template.contactUsForm),
			customClass: 'welcome-overlay',
			allowOutsideClick: false,
			allowEscapeKey: true,
			showCancelButton: true,
			confirmButtonText: 'Send Message',
			confirmButtonColor: '#138013',
			confirmButtonClass: 'btn-success',
			closeOnConfirm: true,
			width: 600
		}, function() {
			sweetAlert.disableButtons();
			setTimeout(function() {
				var name = $('#name').val();
				var email = $('#email').val();
				var subject = $("#subject").val();
				var text = $('#message').val();
				Meteor.call('contactUsEmail', name, email, subject, text, function (error, result) {
					if (error) {
						console.log(error);
					}
					sweetAlert("Thank You", "Thank you for contacting us " + name + ". We'll get back to you as soon as we can.", "success");
				});
			}, 1000);
		});
	}
});