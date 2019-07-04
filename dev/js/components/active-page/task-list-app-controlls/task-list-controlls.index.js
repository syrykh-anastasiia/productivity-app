import TaskListAppControllsTemplate from './task-list-app-controlls-template.js';
import TaskListAppControllsView from './task-list-app-controlls-view.js';
import TaskListAppControllsController from './task-list-app-controlls-controller.js';

window.initTaskListControlls = function() {
	var taskListAppControllsTemplate = new TaskListAppControllsTemplate;
	var taskListAppControllsView = new TaskListAppControllsView(taskListAppControllsTemplate.show());
	var taskListAppControllsController = new TaskListAppControllsController(taskListAppControllsView);
}