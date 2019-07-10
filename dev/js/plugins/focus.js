(function($) {
    $.fn.focus = function() {
        $(this).on('focusin', function() {
            $(this).parent('.category-input').addClass('focus');
        });
        $(this).on('focusout', function() {
            $(this).parent('.category-input').removeClass('focus');
        });
        return this;
    };
}(jQuery));