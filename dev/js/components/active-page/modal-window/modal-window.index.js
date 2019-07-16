window.initModalWindow = function() {
	var modalWindowView = new ModalWindowView();
	var modalWindowModel = new ModalWindowModel();
	var modalWindowController = new ModalWindowController(modalWindowModel, modalWindowView);

	EventBus.on('renderModalWindow', function(mode = 'default') {
		modalWindowView.render(mode);
        modalWindowController.eventListeners();
	});

    EventBus.on('updateModalMode', function(elem) {
    	let mode = elem[0].dataset.mode;
    	switch(mode) {
			case 'add':

				break;
			case 'edit':
                //var task = modalWindowModel.getChosenTaskData(taskId);
                // 	modalWindowController.setTaskToModel(task, taskId);
				break;
			case 'delete':
				break;
		}
	});
}
