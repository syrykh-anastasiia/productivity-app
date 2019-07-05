/*import Handlebars from '../../../libs/handlebars-v4.0.5.js';*/

class StickyHeaderView {
	constructor(template) {
		var self = this;
		self.hTemplate = Handlebars.compile(template);
		var data = self.hTemplate();
		document.body.innerHTML = data;
	}
	run(scrolled) {
		var scrolled = window.pageYOffset || document.documentElement.scrollTop;
		if(!document.getElementById('stickyHeader')) document.body.innerHTML = self.template;
		
		var header = document.getElementById('stickyHeader');
		if(scrolled > 200) header.classList.remove('hidden');
		else if(scrolled <= 200) header.classList.add('hidden');
	}
}