class StickyHeaderView {
	constructor() {
		this.template = Handlebars.compile($('#stickyHeaderTemplate').html());
	}
	render(scrolled) {
        document.body.innerHTML = this.template();
		var scrolled = window.pageYOffset || document.documentElement.scrollTop;
		if(!document.getElementById('stickyHeader')) document.body.innerHTML = self.template;
		
		var header = document.getElementById('stickyHeader');
		if(scrolled > 200) header.classList.remove('hidden');
		else if(scrolled <= 200) header.classList.add('hidden');
	}
}