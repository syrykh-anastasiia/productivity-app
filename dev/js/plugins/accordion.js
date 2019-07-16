(function($) {
	$.fn.accordion = function() {
        $('.drop').slideUp();
		$(this).on('click', '.opener', function() {
            $(this).parent().toggleClass('active');
            $(this).siblings('.drop').slideToggle();
		});
			
		return this;
	};
}(jQuery));