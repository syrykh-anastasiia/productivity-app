(function($) {

	$.fn.modal = function(prop) {
		var modalContainer = $('.modal');
		modalContainer.removeClass('hidden');

		$("#deadline").datepicker({
			showAnim: "slideDown",
	    	changeMonth: true,
	    	changeYear: true,
    		minDate: 0,
	    	dateFormat: "MM dd, yy"
		});

		$('#confirmAdding').click(function() {
			modalContainer.addClass('hidden');
		});
		$('#cancelAdding').click(function() {
			modalContainer.addClass('hidden');
		});
		return this;
	};
}(jQuery));