class StickyHeaderView {
	constructor() {
		var self = this;
		self.hTemplate = Handlebars.compile($('#stickyHeaderTemplate').html());
		document.body.innerHTML = self.hTemplate();
	}
	run(scrolled) {
		var scrolled = window.pageYOffset || document.documentElement.scrollTop;
		if(!document.getElementById('stickyHeader')) document.body.innerHTML = self.template;
		
		var header = document.getElementById('stickyHeader');
		if(scrolled > 200) header.classList.remove('hidden');
		else if(scrolled <= 200) header.classList.add('hidden');
	}
}