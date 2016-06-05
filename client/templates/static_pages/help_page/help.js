Template.helpPage.created = function() {
	DocHead.removeDocHeadAddedTags();

	var linkInfo = [
		{ "rel": "icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": window.location.href }
	];

	var helpPageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": "Review help and frequently asked questions." },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": "Review help and frequently asked questions." },
		{ "property": "og:image", "content": "https://www.xbdash.com/img/contests/contest-banner.jpg" },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": "Help & FAQs | XBdash - The Personalized Dashboard for Xbox® Gamers" },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": window.location.href },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:description", "content": "Review help and frequently asked questions." },
		{ "name": "twitter:title", "content": "Help & FAQs | XBdash - The Personalized Dashboard for Xbox® Gamers" },
		{ "name": "twitter:image", "content": "https://www.xbdash.com/img/contests/contest-banner.jpg" }
	];

	DocHead.setTitle("Help & FAQs | XBdash - The Personalized Dashboard for Xbox® Gamers");

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}

	for(var i = 0; i < helpPageMeta.length; i++) {
		DocHead.addMeta(helpPageMeta[i]);;
	}
}

Template.helpPage.rendered = function() {
	$('#sidebar').affix({
	    offset: {     
	      top: $('#sidebar').offset().top,
	      bottom: ($('footer').outerHeight(true) + $('.application').outerHeight(true)) + 40
	    }
	});
	$(document).on('show','.accordion', function (e) {
	     $(e.target).prev('.accordion-heading').addClass('accordion-opened');
	});
	$(document).on('hide','.accordion', function (e) {
	    $(this).find('.accordion-heading').not($(e.target)).removeClass('accordion-opened');
	});
}

Template.helpPage.events({
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