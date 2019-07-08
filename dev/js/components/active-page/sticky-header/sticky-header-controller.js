class StickyHeaderController {
	constructor(view) {
		var self = this;
		self.view = view;
		window.onscroll = function() {
			if(document.title == 'Task List') { //hack for some time
				//self.view.render();
			}
		};
	}
}