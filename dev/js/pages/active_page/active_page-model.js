class ActivePageModel {
	constructor() {
		
	}
	init() {

	}
	removingItems(id) {
		EventBus.trigger('removeTaskFromCollection', id);
		EventBus.trigger('taskRemove', id);
		EventBus.trigger('clearTaskList');
		EventBus.trigger('getRemoteFBData');
	}
}