import EventBus from './../../../eventBus.js';

import TimerTemplate from './timer-template.js';
import TimerView from './timer-view.js';
import TimerModel from './timer-model.js';
import TimerController from './timer-controller.js';

window.initTimer = function() {
	var timerModel = new TimerModel;
	var timerTemplate = new TimerTemplate;
	var timerView = new TimerView(timerTemplate.show());
	var timerController = new TimerController(timerView, timerModel);

	EventBus.on('renderTimer', function(taskId) {
		timerModel.saveActiveTaskInfo(taskId);
		timerView.render();
	});
};