class HeaderView {
	constructor() {
		this.template = Handlebars.compile($('#headerTemplate').html());
	}

	render(holder) {
        holder.innerHTML += this.template();
		$('.sticky-header').stickyHeader();
        //$('.tooltip').tooltips();
		EventBus.trigger('eventListeners');
	}
}