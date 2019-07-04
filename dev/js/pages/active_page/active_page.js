import EventBus from './../../eventBus.js';

import ActivePageModel from './active_page-model.js';
import ActivePageTemplate from './active_page-template.js';
import ActivePageView from './active_page-view.js';
import ActivePageController from './active_page-controller.js';

window.initActivePage = function() {
	let activePageModel = new ActivePageModel;
	let activePageTemplate = new ActivePageTemplate;
	let activePageView = new ActivePageView(activePageTemplate.show());
	let activePageController = new ActivePageController(activePageModel, activePageView);

	EventBus.on('renderActivePage', function() {
		activePageView.render();
	});
	EventBus.on('removeTask', function(taskId) {
		activePageModel.removingItems(taskId);
	});
	EventBus.on('clearTaskList', function() {
		activePageView.clearTaskListArea();
	});
	EventBus.on('dailyListUpdate', function() {
		activePageView.removingTitle();
		activePageView.clearEmptyWrappers();
	});
}
