window.initTask = function() {
	var taskCollectionModel = new TaskCollectionModel;
	var taskView = new TaskView();
	var taskModel = new TaskModel();
	var taskController = new TaskController(taskModel, taskView);

	EventBus.on('renderTask', function([task, key]) {
		taskView.render(task, key);
	});
	EventBus.on('addNewTask', function(obj) {
		taskModel.addNew(obj);
	});
	
	EventBus.on('addToTaskCollection', function([key, value]) {
		taskCollectionModel.add(key, value);
	});
	EventBus.on('editExistingTask', function([id, obj]) {
		taskModel.editSingleTask(id, obj);
	});
	EventBus.on('removeTaskFromCollection', function(taskId) {
		taskCollectionModel.removeTask(taskId);
	});
	
}
