var newsLimit = new ReactiveVar();

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

Template.aboutUs.helpers({
	resetPasswordToken: function() {
		return Session.get('resetPasswordToken');
	},
	article: function() {

	}
});

Template.aboutUs.events({
	'click #contact-box': function(e) {
		e.preventDefault();
		sweetAlert({
			title: 'Contact Us',
			html: Blaze.toHTML(Template.contactUsForm),
			customClass: 'contact-us-modal',
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
	$('#news .grid:nth-child(3n+0)').addClass('.grid-item--width2');
}

Template.homeNewsSection.helpers({
	latestNews: function() {
		return xbdNews.find({}, {
			sort: { updated: -1 },
			limit: 12
		}).fetch();
	},
	getImage: function () {
        var image = this.content.match(/<img[^>]*>/);
        var getImage = '/img/news-default.jpg';
        if (image) {
            getImage = image[0].match(/src="(.+?)"/)[1];
            getImage = "https://res.cloudinary.com/xbdash/image/fetch/" + encodeURIComponent(getImage);
        }
        return getImage;
	},
	updatedDate: function() {
		return moment(this.updated).format('MMMM Do, YYYY');
	}
	// ,
	// shareCount: function() {
	// 	if (this.shareCount) {
	// 		var shareCount = shareFormatter(this.shareCount);
	// 		if (this.shareCount === 1) {
	// 			return shareCount + ' share';
	// 		} else {
	// 			return shareCount + ' shares';
	// 		}
	// 	}
	// 	return '0 shares';
	// }
});