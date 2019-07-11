/**
* @constructor
* @param model
* @param view
* @name ActivePageController
*/
class ActivePageController {
	constructor(model, view) {
		var self = this;
		self.view = view;
		self.model = model;

		//var $accordion = $('#globalListToggle');
		//$accordion.accordion();
		//$('.accordion-header').click(function() { //fix this repeat
		//	$accordion.find('.accordion-icon').toggleClass('icon-global-list-arrow-right');
		//});
		//$('.app-controll').tooltips();

		document.addEventListener('click', function(event) {
		 	var target = event.target;
		 	if(target.closest('.add-task') || target.classList.contains('add-task')) {
		 		EventBus.trigger('renderModalWindow', ['Add']);
				//$('#modalWindow').modal();
		 	}
		 	else if(target.closest('edit-task') || target.classList.contains('add-task')) {
		 		//let taskId = target.parentNode.parentNode.parentNode.dataset.key; //i'll fix it
		 		//EventBus.trigger('renderModalWindow', ['Edit', taskId]);
		 		//$('#modalWindow').modal();
		 	} else if(target.closest('.remove-task')) {
		 		//let taskId = target.parentNode.parentNode.dataset.key; //i'll fix it
		 		//EventBus.trigger('removeTask', taskId);
		 	} else if(target.closest('.open-timer')) {
		 		//let taskId = target.parentNode.parentNode.dataset.key;
		 		//EventBus.trigger('renderTimer', taskId);
		 	} else if(target.closest('.priority-filter')) {
		 		//TaskCollectionModel.getByProperty('priority', target.innerHTML);
		 	} else if(target.closest('.arrow-to-top')) {
		 		//let removingTask = target.parentNode.parentNode.parentNode;
		 		//let removingTaskParent = removingTask.parentNode;
		 		//document.getElementsByClassName('today-task-list')[0].appendChild(removingTask);
		 		//self.view.removeParent(removingTaskParent);
		 		//self.view.setTaskToDaily(removingTask);
		 		//EventBus.trigger('dailyListUpdate');
		 	}
		 });
	}
	
	
}

