(function($) {
    $.fn.stickyHeader = function() {
        var sticky = $(this);
        $(window).on('scroll', function() {
            if($(window).scrollTop() > sticky.outerHeight()) {
                sticky.addClass('fixed');
            }
        });
        //console.log(this);
        //return this;
    };
}(jQuery));