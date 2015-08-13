jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    easeInOutExpo: function (x, t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
});

!function ($) {
    $(function(){
        $(document).on('click.app','[data-ride="scroll"]',function (e) {
            e.preventDefault();
            var $target = this.hash;
            $('html, body').stop().animate({
                'scrollTop': $($target).offset().top - 70
            }, 1000, 'easeInOutExpo', function () {
                window.location.hash = $target;
            });
            return false;
        });
    });
}(window.jQuery);