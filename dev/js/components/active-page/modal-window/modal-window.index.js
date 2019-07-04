import EventBus from './../../../eventBus.js';
import ModalWindowTemplate from './modal-window-template.js';
import ModalWindowView from './modal-window-view.js';
import ModalWindowModel from './modal-window-model.js';
import ModalWindowController from './modal-window-controller.js';

window.initModalWindow = function() {
	var modalWindowTemplate = new ModalWindowTemplate;
	var modalWindowView = new ModalWindowView(modalWindowTemplate.show());
	var modalWindowModel = new ModalWindowModel();
	var modalWindowController = new ModalWindowController(modalWindowModel, modalWindowView);

	EventBus.on('renderModalWindow', function([mode, taskId]) {
		modalWindowView.render(mode);
		if(mode === 'Edit') {
			var task = modalWindowModel.getChosenTaskData(taskId);
		 	modalWindowController.setTaskToModel(task, taskId);
		}
	});
}
