class ModalWindowController {
	constructor(model, view) {
		var self = this;
		self.view = view;
		self.model = model;

		document.addEventListener('click', function(event) {
			let target = event.target;
			if(target.id === 'confirmAdding') {
				let newTaskInfo = self.getDataFromModal();
				if(target.classList.contains('Add')) {
					EventBus.trigger('addNewTask', newTaskInfo);
				} else if(target.classList.contains('Edit')) {
					let modal = document.querySelector('.modal-open');
					EventBus.trigger('editExistingTask', [modal.dataset.key, newTaskInfo]);
				}
				self.view.destroy();
			} else if(target.id === 'cancelAdding') {
				self.view.destroy();
			}
		});
	}
	getDataFromModal() {
		let modal = document.querySelector('.modal-open');
		let title = modal.querySelector('#title').value;
		let description = modal.querySelector('#description').value;
		let category = [];
		let categories = modal.querySelectorAll('.category-list');
		for(var i = 0; i < categories.length; i++) {
			if(categories[i].checked) {
				category[0] = i;
				category[1] = categories[i].parentNode.querySelector('.input-text').innerHTML;
			}
		}
		let deadline = modal.querySelector('#deadline').value;	
		let estimations = modal.querySelectorAll('.estimation-list');
		let estimation = 0;
		for(var i = 0; i < estimations.length; i++) {
			if(estimations[i].checked) {
				estimation++;
			}
		}
		let priority = '';
		let priorities = modal.querySelectorAll('.priority-list');
		for(var i = 0; i < priorities.length; i++) {
			if(priorities[i].checked) {
				priority = priorities[i].parentNode.querySelector('.input-text').innerHTML;
			}
		}
		let obj = {
					title: title, 
					description: description, 
					category: category, 
					deadline: deadline, 
					estimation: estimation,
					priority: priority
				};
		return obj;
	}
	setTaskToModel(task, taskId) {
		var modal = document.querySelector('.modal-open');
		modal.dataset.key = taskId;
		modal.querySelector('#title').value = task.title;
		modal.querySelector('#description').value = task.description;
		var categoryIndex = task.category[0];
		modal.querySelectorAll('.category-list')[categoryIndex].checked = true;
		modal.querySelector('#deadline').value = task.deadline;	
		var estimations = modal.querySelectorAll('.estimation-list');
		var estimationIndex = task.estimation;
		for(var i = 0; i < estimationIndex; i++) {
			estimations[i].checked = true;
		}
		var priority = task.priority;
		var priorities = modal.querySelectorAll('.priority-value');
		for(var i = 0; i < priorities.length; i++) {
			if(priority.localeCompare(priorities[i].innerHTML) == 0) {
				priorities[i].checked = true;
			}
		}
	}
}