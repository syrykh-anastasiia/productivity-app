import EventBus from './../../eventBus.js';
export default class TaskModel {
	constructor() {
		EventBus.on('updateSingleTask', function([taskId, propertyName, propertyValue]) {
			var taskList = JSON.parse(LocalStorageData.getFromLS('TaskList'));
			for(var i in taskList) {
				if(i == taskId) {
					taskList[i][propertyName] = propertyValue;
				}
			}
			LocalStorageData.setToLS('TaskList', JSON.stringify(taskList));
		});
	}
	addNew(args) {
		var monthNames = ["January", "February", "March", "April", "May", "June",
						  "July", "August", "September", "October", "November", "December"
						];
		var date = new Date();
		var task = {
			title: args.title || 'Default Title',
			description: args.description || 'Default Description',
			category: args.category,
			deadline: args.deadline || monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear(),
			estimation: args.estimation || 1,
			priority: args.priority
		}
		EventBus.trigger('taskAdding', task);
	}
	editSingleTask(id, obj) {
		for(let i in obj) {
			EventBus.trigger('updateSingleTask', [id, i, obj[i]]);
		}
		EventBus.trigger('clearTaskList');
		EventBus.trigger('getRemoteFBData');
	}
}