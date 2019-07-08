window.initTaskListControlls = function() {
	var taskListAppControllsView = new TaskListAppControllsView();
	var taskListAppControllsController = new TaskListAppControllsController(taskListAppControllsView);

    EventBus.on('renderTaskListControls', function() {
        taskListAppControllsView.render();
    });
}