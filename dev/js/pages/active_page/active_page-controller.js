import EventBus from '../../eventBus.js';
/**
* @constructor
* @param model
* @param view
* @name ActivePageController
*/
export default class ActivePageController {
	constructor(model, view) {
		var self = this;
		self.view = view;
		self.model = model;

		window.initStickyHeader();
		window.initTaskListControlls();
		window.initModalWindow();
		window.initTask();
		window.initTimer();

		self.view.render();

		var $accordion = $('#globalListToggle');
		$accordion.accordion();
		$('.accordion-header').click(function() { //fix this repeat
			$accordion.find('.accordion-icon').toggleClass('icon-global-list-arrow-right');
		});
		$('.app-controll').tooltips();

		document.addEventListener('click', function(event) {
		 	var target = event.target;
		 	if(target.closest('#addBtn') || target.closest('#addIcon')) {
		 		EventBus.trigger('renderModalWindow', ['Add']);
				$('#modalWindow').modal();
		 	}
		 	else if(target.closest('#editBtn')) {
		 		let taskId = target.parentNode.parentNode.parentNode.dataset.key; //i'll fix it
		 		EventBus.trigger('renderModalWindow', ['Edit', taskId]);
		 		$('#modalWindow').modal();
		 	} else if(target.closest('.removeItem')) {
		 		let taskId = target.parentNode.parentNode.dataset.key; //i'll fix it
		 		EventBus.trigger('removeTask', taskId);
		 	} else if(target.closest('.open-timer')) {
		 		let taskId = target.parentNode.parentNode.dataset.key;
		 		EventBus.trigger('renderTimer', taskId);
		 	} else if(target.closest('.priority-filter')) {
		 		TaskCollectionModel.getByProperty('priority', target.innerHTML);
		 	} else if(target.closest('.arrow-to-top')) {
		 		let removingTask = target.parentNode.parentNode.parentNode;
		 		let removingTaskParent = removingTask.parentNode;
		 		document.getElementsByClassName('today-task-list')[0].appendChild(removingTask);
		 		self.view.removeParent(removingTaskParent);
		 		self.view.setTaskToDaily(removingTask);
		 		EventBus.trigger('dailyListUpdate');
		 	}
		 });
	}
	
	
}

