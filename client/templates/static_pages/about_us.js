Template.aboutUs.events({
	'click #contactBox': function() {
		bootbox.dialog({
			title: "Contact Us",
			message: "<div class='row'>" +
					"<div class='col-sm-12 contact-form'>" + 
					"<form id='contact' method='post' class='form' role='form'>" + 
					"<div class='row'>" + 
						"<div class='col-xs-6 col-md-4 form-group'>" + 
							"<input class='form-control' id='name' name='name' placeholder='Name*' type='text' required autofocus />" + 
						"</div>" + 
						"<div class='col-xs-6 col-md-4 form-group'>" + 
							"<input class='form-control' id='email' name='email' placeholder='Email*' type='email' required />" + 
						"</div>" + 
						"<div class='col-xs-6 col-md-4 form-group'>" + 
							"<select class='form-control selectpicker' data-style='btn-inverse' required>" +
								"<option>General Inquiry</option>" +
								"<option>Feature Request</option>" +
								"<option>Report a Bug</option>" +
							"</select>" +
						"</div>" + 
					"</div>" + 
					"<textarea class='form-control' id='message' name='message' placeholder='Message' rows='5'></textarea>" + 
					"</form>" + 
				"</div>" +
				"</div>",
			buttons: {
				success: {
					label: "Send Message",
					className: "btn-success",
					callback: function () {
						var name = $('#name').val();
						//Example.show("Thank you " + name + ". Your message has been sent!");
						console.log(name);
					}
				}
			},
			onEscape: function() {
				bootbox.hideAll();
			},
			backdrop: true
		});
	},
	'click .modal-backdrop': function() {
		$('.bootbox-close-button').click();
	}
});

Template.carousel.rendered = function() {
	$('#carousel1').carousel({
		interval: false
	});

	var clickEvent = false;

	$('#carousel1').on('mouseover', '.nav-pills a', function () {
		clickEvent = true;
		$('.nav-pills div').removeClass('active');
		$(this).parent().addClass('active');
	}).on('slid.bs.carousel', function (e) {
		if (!clickEvent) {
			var count = $('.nav-pills').children().length - 1;
			var current = $('.nav-pills div.active');
			current.removeClass('active').next().addClass('active');
			var id = parseInt(current.data('slide-to'));
			if (count == id) {
			    $('.nav-pills div').first().addClass('active');
			}
		}
		clickEvent = false;
	});

	var clickEvent2 = false;

	$('.nav-pills a').mouseover(function() {
		var ctrl = $(this);
		var interval = 100;

		clickEvent2 = setInterval(function(){
		   ctrl.trigger("click");
		}, interval);
	});

	$('.nav-pills a').mouseout(function(){
		clearInterval(clickEvent2);
		clickEvent2 = false;
	});

	$(window).load(function() {
		$('.notify').waypoint(function(direction) {
				if (direction === "down") {
		            //console.log("waypoint fire");
		            $('#dash-image').addClass('animate');
		            $('#dash-image').addClass('fadeInLeft');
		            $('#dash-image').addClass('animated');
		        }
	        },
	        {
	            offset: '80%',
	            triggerOnce: true
	    });

	    $('.home-what-icons').waypoint(function(direction) {
	    	if (direction === "down") {
		    	$('.home-what-icons').addClass('animate');
		    	$('.home-what-icons').addClass('fadeInUp');
		    	$('.home-what-icons').addClass('animated');
		    }
	    },
	    {
	    	offset: '80%',
	    	triggerOnce: true
	    });

	    $('.dashboard-features').waypoint(function(direction) {
	    	if (direction === "down") {
	    		$('.dashboard-features').addClass('animate');
	    		$('.dashboard-features').addClass('fadeInRight');
		    	$('.dashboard-features').addClass('animated');
	    	}
	    },
	    {
	    	offset: '80%',
	    	triggerOnce: true
	    });
	    $('.faqs-1, .faqs-2').waypoint(function(direction) {
	    	if (direction === "down") {
	    		$('.faqs-1, .faqs-2').addClass('animate');
	    		$('.faqs-1').addClass('fadeInLeft');
	    		$('.faqs-2').addClass('fadeInRight');
		    	$('.faqs-1, .faqs-2').addClass('animated');
	    	}
	    },
	    {
	    	offset: '70%',
	    	triggerOnce: true
	    });
	});
}