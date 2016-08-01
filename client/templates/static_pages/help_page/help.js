Template.helpPage.created = function() {
	DocHead.removeDocHeadAddedTags();

	var helpPageDescription = "Review help and frequently asked questions.";
	var helpPageImage = "https://www.xbdash.com/img/share-default.jpg";
	var helpPageTitle = "Help & FAQs | XBdash - The Personalized Dashboard for Xbox® One and Xbox® 360 Gamers";
	var helpPageUrl = window.location.href;

	var helpPageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "description", "content": helpPageDescription },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": helpPageDescription },
		{ "property": "og:image", "content": helpPageImage },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": helpPageTitle },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": helpPageUrl },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:url", "content": helpPageUrl },
		{ "name": "twitter:title", "content": helpPageTitle },
		{ "name": "twitter:description", "content": helpPageDescription },
		{ "name": "twitter:image:src", "content": helpPageImage },
		{ "name": "twitter:site", "content": "@xboxdash" }
	];

	var linkInfo = [
		{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": helpPageUrl },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
	];

	DocHead.setTitle(helpPageTitle);

	for(var i = 0; i < helpPageMeta.length; i++) {
		DocHead.addMeta(helpPageMeta[i]);;
	}

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
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

Template.helpApp.helpers({
	utcTime: function() {
		return moment().utc().format('MMMM Do YYYY, h:mm a');
	},
	easternTime: function() {
		return moment().utcOffset(-4).format('MMMM Do YYYY, h:mm a');
	},
	centralTime: function() {
		return moment().utcOffset(-5).format('MMMM Do YYYY, h:mm a');
	},
	mountainTime: function() {
		return moment().utcOffset(-6).format('MMMM Do YYYY, h:mm a');
	},
	pacificTime: function() {
		return moment().utcOffset(-7).format('MMMM Do YYYY, h:mm a');
	}
});