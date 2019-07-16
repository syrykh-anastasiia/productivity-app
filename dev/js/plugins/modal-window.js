(function($) {

	$.fn.modalWindow = function() {
		var modal = $(this);
		$('.add-task, .edit-task, .remove-task').on('click', function(e) {
			e.preventDefault();
            EventBus.trigger('updateModalMode', $(this));
            modal.addClass('modal-open');
		});

        $('.modal-btns button').on('click', function() {
            modal.removeClass('modal-open');
		});

		return this;
	};
}(jQuery));