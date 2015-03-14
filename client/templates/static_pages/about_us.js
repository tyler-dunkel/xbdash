Template.carousel.rendered = function() {
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
	    	offset: '50%',
	    	triggerOnce: true
	    });
	});
}