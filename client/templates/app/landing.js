jQuery.extend(jQuery.easing,
{
    def: 'easeOutQuad',
    easeInOutExpo: function (x, t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
});

//this is an attempt at using appear.js
// $('#test').appear();
// $('#test').on('appear', function() {
//     console.log('test me');
// });

//this is an attempt at using jquery-waypoints
// var waypoint = new Waypoint({
//         element: document.getElementById('tester'),
//         handler: function(direction) {
//             alert('fuck you' + direction);
//         }
//     });

// $('#dash-image').waypoint({
//     handler: function(direction) {
//         console.log('fuck you' + direction);
//     }
// });

//this is an attempt at adding classes on scroll
// $(window).scroll(function() {
//     if ($('#dash-image').is(':visible')) {
//         $('#dash-image').addClass('animate').addClass('fadeInUp');
//     }
// });
!function ($) {

     $(function(){
    // var waypoint = new Waypoint({
    //     element: document.getElementById('tester'),
    //     handler: function(direction) {
    //         alert('fuck you' + direction);
    //     }
    // });
    //console.log("tester");
 //    $('[data-ride="animated"]').appear();
	// $('[data-ride="animated"]').on('appear', function() {
 //        var $el = $(this), $ani = ($el.data('animation') || 'fadeIn'), $delay;
 //        console.log($el);
 //        if ( !$el.hasClass('animated') ) {
 //        	$delay = $el.data('delay') || 0;
 //            setTimeout(function(){
 //                $el.removeClass('invisible').addClass( $ani + " animated" );
 //            }, $delay);
 //        }
   // });
    
    $(document).on('click.app','[data-ride="scroll"]',function (e) {
        e.preventDefault();
        var $target = this.hash;
        $('html, body').stop().animate({
            'scrollTop': $($target).offset().top - 80
        }, 1000, 'easeInOutExpo', function () {
            window.location.hash = $target;
        });
    });
    
  });
}(window.jQuery);