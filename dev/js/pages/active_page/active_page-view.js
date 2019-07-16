class ActivePageView {
	constructor() {
		this.template = Handlebars.compile($('#activePageTemplate').html());
	}

	render() {
		var self = this;
        let container = document.getElementById('main').querySelector('.container');
		document.title = 'Active Page';
        container.innerHTML = this.template();

		if(LocalStorageData.getFromLS('TaskList') !== null) {
			var list = JSON.parse(LocalStorageData.getFromLS('TaskList'));
			setTimeout(function() {
				if(document.getElementsByClassName('global-tasklist')[0].childNodes.length === 0) { //fix with async fb
					for(var i in list) {
						EventBus.on('renderTask', [list[i], i]);
					}
				}
				self.dailyRender();
			}, 3000); //hack for some time
		} else {
			document.getElementsByClassName('subtitle-holder')[0].classList.add('unactive');
            document.getElementsByClassName('tasklist-global')[0].classList.add('unactive');
            document.getElementsByClassName('tasklist-nav')[0].classList.add('unactive');
		}

		$('.accodrion-holder').accordion();
	}

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

	sortTasks() {
		//tasklist-sort
	}
}
	