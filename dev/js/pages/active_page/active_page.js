window.initActivePage = function() {
	let activePageModel = new ActivePageModel;
	let activePageView = new ActivePageView();
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
