function ArrowsController(view) {
	this.view = view;

	this.view.render();

	document.addEventListener('click', function() {
		if(event.target.classList.contains('icon-arrow-left')) {
			EventBus.trigger('routeChange', '#active_page');
		} /*else if(event.target.classList.contains('icon-arrow-right')) {

		}*/
	});
}