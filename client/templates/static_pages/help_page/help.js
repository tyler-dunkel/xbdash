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
	     //$('.accordion-heading i').toggleClass(' ');
	     $(e.target).prev('.accordion-heading').addClass('accordion-opened');
	});

	$(document).on('hide','.accordion', function (e) {
	    $(this).find('.accordion-heading').not($(e.target)).removeClass('accordion-opened');
	    //$('.accordion-heading i').toggleClass('fa-chevron-right fa-chevron-down');
	});
}

Template.helpPage.events({
});

Tracker.autorun(function() {
});