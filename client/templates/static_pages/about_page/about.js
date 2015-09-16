var newsLimit = new ReactiveVar();

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
							"<select class='form-control selectpicker' id='subject' data-style='btn-inverse' required>" +
								"<option value='General Inquiry'>General Inquiry</option>" +
								"<option value='Feature Request'>Feature Request</option>" +
								"<option value='Report a Bug'>Report a Bug</option>" +
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
						var email = $('#email').val();
						var subject = $("#subject").val();
						var text = $('#message').val();
						//Example.show("Thank you " + name + ". Your message has been sent!");
						Meteor.call(
							'contactUsEmail',
							name,
							email,
							subject,
							text,
							function (error, result) {
								if (error) {
									// error
								} else {
									toastr.success("Thank you for contacting us " + name + ". We'll get back to you as soon as we can.", "Thank You");
									/*
									bootbox.dialog({
										title: "Thank You",
										message: "Thank you for contacting us " + name + ". We'll get back to you as soon as we can.",
										buttons: {
											danger: {
												label: "Close",
												className: "btn-danger"
											}
										}
									});
									*/
								}
							}
						);
					}
				}
			},
			onEscape: function() {
				bootbox.hideAll();
			},
			backdrop: true
		});
	}
});

Template.aboutUs.helpers({
	resetPasswordToken: function() {
		return Session.get('resetPasswordToken');
	},
	article: function() {

	}
});

Template.aboutUs.rendered = function() {
	$('body').addClass('home-page');

	$(window).bind('scroll', function() {
        if ($(window).scrollTop() > 150) {
            $('.navbar-fixed-top').addClass('on');
        } else {
            $('.navbar-fixed-top').removeClass('on');
        }
    });

    $('body').scrollspy({ 
        target: '.navbar-fixed-top',
        offset: 100
    });
}

Template.aboutUs.destroyed = function() {
	$('body').removeClass('home-page');
}

Template.carouselSection.rendered = function() {
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

	$('#carousel-image').load(function() {
		$('.notify').waypoint(function(direction) {
				if (direction === "down") {
		            //console.log("waypoint fire");
		            $('#dash-image').addClass('animate');
		            $('#dash-image').addClass('fadeInLeft');
		            $('#dash-image').addClass('animated');
		        }
	        },
	        {
	            offset: '85%',
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

Template.homeNewsSection.created = function() {
	this.subscribe('latestNews', 12);
}

Template.homeNewsSection.rendered = function() {
    $('.post-image-box .img-full').error(function() {
        $(this).attr('src', '/img/news-default.jpg');
    });
    $('#news .grid').masonry({
		// set itemSelector so .grid-sizer is not used in layout
		itemSelector: '.grid-item',
		// use element for option
		columnWidth: '465px',
		isFitWidth: true,
		transitionDuration: '0.3s'
	});
	$('#news .grid:nth-child(3n+0)').addClass('.grid-item--width2');
}

Template.homeNewsSection.helpers({
	latestNews: function() {
		return xbdNews.find({}, {
			sort: { updated: -1 },
			fields: {
				updated: 1,
				title: 1,
				content: 1,
				id: 1,
				author: 1,
				shareCount: 1
			},
			limit: 12
		}).fetch();
	},
	getImage: function () {
        var image = this.content.match(/<img[^>]*>/);
        if (image) {
            var getImage = image[0].match(/src="(.+?)"/)[1];
        } else {
        	getImage = '/img/news-default.jpg';
        }
        return getImage;
	},
	updatedDate: function() {
		return moment(this.updated).format('MMMM Do, YYYY');
	},
	shareCount: function() {
		if (this.shareCount) {
			var shareCount = shareFormatter(this.shareCount);
			if (this.shareCount === 1) {
				return shareCount + ' share';
			} else {
				return shareCount + ' shares';
			}
		}
		return '0 shares';
	}
});