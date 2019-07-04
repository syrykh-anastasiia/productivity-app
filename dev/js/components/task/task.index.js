import EventBus from './../../eventBus.js';

import TaskCollectionModel from './../task-collection/task-collection-model.js';
import TaskTemplate from './task-template.js';
import TaskView from './task-view.js';
import TaskModel from './task-model.js';
import TaskController from './task-controller.js';

window.initTask = function() {
	var taskCollectionModel = new TaskCollectionModel;
	var taskTemplate = new TaskTemplate;
	var taskView = new TaskView(taskTemplate.show());
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
