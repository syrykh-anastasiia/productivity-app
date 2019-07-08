window.initModalWindow = function() {
	var modalWindowView = new ModalWindowView();
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
