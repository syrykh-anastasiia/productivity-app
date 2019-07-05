window.initTaskListControlls = function() {
	var taskListAppControllsTemplate = new TaskListAppControllsTemplate;
	var taskListAppControllsView = new TaskListAppControllsView(taskListAppControllsTemplate.show());
	var taskListAppControllsController = new TaskListAppControllsController(taskListAppControllsView);
}