(function($) {

	$.fn.accordion = function(prop) {
			$('.accordion-header').click(function(event) {
				var accordionHeader = $('.accordion-header');
				var accordionBody = $('.accordion-body');
		
				accordionBody.toggleClass('hidden');
			});
			
		return this;
	};
}(jQuery));