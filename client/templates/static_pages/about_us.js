Template.homeWhatSection.rendered = function() {
	$('.notify').waypoint(function(direction) {
            alert('Top of notify element hit top of viewport.');
            $('#dash-image').addClass('animate');
            $('#dash-image').addClass('fadeInDown');
            //this.destroy();
        },
        {
            offset: '90%'
    });
}