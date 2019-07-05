/*import StickyHeaderTemplate from './sticky-header-template.js';
import StickyHeaderView from './sticky-header-view.js';
import StickyHeaderController from './sticky-header-controller.js';*/

window.initStickyHeader = function() {
	var stickyHeaderTemplate = new StickyHeaderTemplate;
	var stickyHeaderView = new StickyHeaderView(stickyHeaderTemplate.show());
	var stickyHeaderController = new StickyHeaderController(stickyHeaderView);
}