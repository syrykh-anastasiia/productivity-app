import EventBus from './../../eventBus.js';
/**
* @constructor
* @param template
* @name ActivePageView
*/
import Handlebars from './../../libs/handlebars-v4.0.5.js';

export default class ActivePageView {
	constructor(template) {
		this.template = template;
	}
	render() {
		var self = this;
		document.title = 'Active Page';
		var hTemplate = Handlebars.compile(this.template);
		var data = hTemplate();
		document.body.innerHTML += data;

		if(LocalStorageData.getFromLS('TaskList') !== null) {
			var list = JSON.parse(LocalStorageData.getFromLS('TaskList'));
			document.getElementsByClassName('btn-groups')[0].classList.remove('hidden');
			this.pageTitle();
			setTimeout(function() {
				if(document.getElementsByClassName('global-task-list')[0].childNodes.length === 0) { //fix with async fb
					for(var i in list) {
						EventBus.on('renderTask', [list[i], i]);
					}
				}
				self.dailyRender();
			}, 3000); //hack for some time
		}
	}
/**
* @memberof ActivePageView
*/
	pageTitle() {
		var titleContainer = document.getElementsByClassName('title-to-task')[0];
		titleContainer.innerHTML = '<p class="top-hint">Task added,<br>drag it to the top 5 in daily task list<br><i class="icon-arrow_circle"></i></p>';
	}
/**
* @memberof ActivePageView
*/
	setTaskToDaily(task) {
		var taskBlock = task.children;
		for(var i = 0; i < taskBlock.length; i++) {
			if(taskBlock[i].classList.contains('task-deadline')) {
				taskBlock[i].innerHTML = 'Today';
				EventBus.trigger('updateSingleTask', [task.dataset.key, 'deadline', 'Today']);
			}
		}
	}
	dailyRender() {
		let self = this;
		let taskList = document.getElementsByClassName('task-block');
		for(var i = 0; i < taskList.length; i++) {
			let taskFields = taskList[i].children;
			for(var j = 0; j < taskFields.length; j++) {
				if(taskFields[j].classList.contains('task-deadline') && (taskFields[j].innerHTML === 'Today')) {
		 			let toRemove = taskList[i].parentNode;
		 			document.getElementsByClassName('today-task-list')[0].appendChild(taskList[i]);
		 			self.removeParent(toRemove);
		 			EventBus.trigger('dailyListUpdate');
				}
			}
		}
	}
	clearTaskListArea() {
		document.getElementsByClassName('global-task-list')[0].innerHTML = '';
	}
	removingTitle() {
		document.getElementsByClassName('title-to-task')[0].innerHTML = '';
	}
	removeParent(parentRef) {
		parentRef.remove();
	}
	clearEmptyWrappers() {
		let categoryWrappers = document.getElementsByClassName('category-wrapper');
		for(var i = 0; i < categoryWrappers.length; i++) {
			if(!categoryWrappers[i].querySelector('.tasks-categories')) categoryWrappers[i].remove();
		}
	}
}
	