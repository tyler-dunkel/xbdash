Template.helpPage.created = function() {
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