var newsLimit = new ReactiveVar();

Template.aboutUs.created = function() {
	DocHead.removeDocHeadAddedTags();

	var aboutUsPageDescription = "Manage achievements. Complete games. See results. XBdash is a personalized dashboard for Xbox® Gamers. Manage achievements. Complete games. See results.";
	var aboutUsPageImage = "https://www.xbdash.com/img/share-default.jpg";
	var aboutUsPageTitle = "XBdash - The Personalized Dashboard for Xbox® Gamers";
	var aboutUsPageUrl = window.location.href;

	var aboutUsPageMeta = [
		{ "name": "viewport", "content": "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" },
		{ "charset": "utf-8" },
		{ "http-equiv": "X-UA-Compatible", "content": "IE=edge,chrome=1" },
		{ "name": "p:domain_verify", "content": "00252b5416e600a95b1e2e9bf0e294b0" },
		{ "name": "description", "content": aboutUsPageDescription },
		{ "property": "fb:app_id", "content": Meteor.settings.public.facebookAppId },
		{ "property": "og:description", "content": aboutUsPageDescription },
		{ "property": "og:image", "content": aboutUsPageImage },
		{ "property": "og:locale", "content": "en_US" },
		{ "property": "og:site_name", "content": "XBdash" },
		{ "property": "og:title", "content": aboutUsPageTitle },
		{ "property": "og:type", "content": "website" },
		{ "property": "og:url", "content": aboutUsPageUrl },
		{ "name": "twitter:card", "content": "summary_large_image" },
		{ "name": "twitter:url", "content": aboutUsPageUrl },
		{ "name": "twitter:title", "content": aboutUsPageTitle },
		{ "name": "twitter:description", "content": aboutUsPageDescription },
		{ "name": "twitter:image:src", "content": aboutUsPageImage },
		{ "name": "twitter:site", "content": "@xboxdash" }
	];
	
	var linkInfo = [
		{ "rel": "shortcut icon", "type": "image/x-icon", "href": "https://www.xbdash.com/img/favicon.ico" },
		{ "rel": "canonical", "href": aboutUsPageUrl },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "144x144" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "114x114" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "sizes": "72x72" , "type": "image/png" },
		{ "rel": "apple-touch-icon-precomposed", "href": "https://www.xbdash.com/img/xbdash_touch_icon_1000x1000.png", "type": "image/png" }
	];

	DocHead.setTitle(aboutUsPageTitle);

	for(var i = 0; i < aboutUsPageMeta.length; i++) {
		DocHead.addMeta(aboutUsPageMeta[i]);;
	}

	for(var i = 0; i < linkInfo.length; i++) {
		DocHead.addLink(linkInfo[i]);;
	}
}

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