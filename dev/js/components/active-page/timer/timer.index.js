window.initTimer = function() {
	var timerModel = new TimerModel;
	var timerView = new TimerView();
	var timerController = new TimerController(timerView, timerModel);

	EventBus.on('renderTimer', function(taskId) {
		timerModel.saveActiveTaskInfo(taskId);
		timerView.render();
	});
};