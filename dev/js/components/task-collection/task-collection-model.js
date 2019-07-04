import EventBus from './../../eventBus.js';
export default class TaskCollectionModel {
	constructor() {
		this.collection = this.collection || {};
		//
	}
	add(key, task) {
		this.collection[key] = task;
		LocalStorageData.setToLS('TaskList', JSON.stringify(this.collection));
		if(location.hash === '#active_page') {
			EventBus.trigger('renderTask', [task, key]);
			//TaskView(task, key);
		}
	}
	getTask(taskId) {
		return this.collection[taskId];	
	}
	removeTask(taskId) {
		delete this.collection[taskId];
	}
	getByProperty(property, sortValue) {
		var keys = Object.keys(this.collection);
		console.log(keys);
		for(var i = 0; i < keys.length; i++) {
			console.log(this.collection[i]);
		}
	}
}