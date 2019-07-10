(function($) {
	$.fn.tabs = function() {
		$(this + 'a').click(function(event) {
			event.preventDefault();
			console.log($(this));
		});
		return this;
	};
}(jQuery));