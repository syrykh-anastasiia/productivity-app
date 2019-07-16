window.addEventListener('load', function() {
    $('body').addClass('loaded');

    window.initApp();
});

window.initApp = function() {
    let mainTemplate = Handlebars.compile($('#mainTemplate').html());

    window.initHeader();
    window.initModalWindow();
    window.initTask();
    window.initTimer();
    window.initSettingsCategories();
    window.initSettingsPomodoros();
    window.initLogin();
    window.initSettings();
    window.initActivePage();

    document.body.innerHTML = '<div id="wrapper"></div>';

    let wrapper = document.getElementById('wrapper');

    EventBus.trigger('renderHeader', wrapper);
    wrapper.innerHTML += mainTemplate();

    let currentHash = location.hash;

    if(currentHash.length === 0 || currentHash === '#' || !LocalStorageData.getFromLS('username')) EventBus.trigger('routeChange', '#login');
    else Router.routing(location.hash.substr(1));
};
EventBus = {
	events: {},
	on: function(eventName, func) { //subscribe
		this.events[eventName] = this.events[eventName] || [];
		this.events[eventName].push(func);
	},
	off: function(eventName, func) { //unsubscribe
		if(this.events[eventName]) {
			for(var i = 0; i < this.events[eventName].length; i++) {
				if(this.events[eventName][i] === func) {
					this.events[eventName].splice(i, 1);
					break;
				}
			}
		}
	},
	trigger: function(eventName, data) { //throw event
		if(this.events[eventName]) {
			this.events[eventName].forEach(function(func) {
				func(data);
			});
		}
	}
};
class Router {
	static routing(location) {
		let currentLocation = location || window.location.hash.substr(1);
		EventBus.trigger('getRemoteFBData');
		switch(currentLocation) {
			case 'login':
				EventBus.trigger('renderLogin');
				break;
            case 'logout':
                LocalStorageData.removeFromLS('username');
                EventBus.trigger('routeChange', '#login');
                break;
			case 'settings':
				EventBus.trigger('renderSettings');
				break;
			case 'active_page':
				EventBus.trigger('renderActivePage');
				break;
		}
	}
}

EventBus.on('routeChange', function(route) {
	route = route.substr(1);
	switch(route) {
		case 'login':
			location.hash = '#login';
			break;
		case 'settings':
			location.hash = '#settings';
			break;
		case 'active_page':
			location.hash = '#active_page';
			break;
	}
});

EventBus.on('afterLogin', function() {
    EventBus.trigger('loginDestroy');
    if(LocalStorageData.getFromLS('Pomodoros') === null && LocalStorageData.getFromLS('Categories') === null) {
        EventBus.trigger('routeChange', '#settings');
    } else {
        EventBus.trigger('routeChange', '#active_page');
    }
});

window.addEventListener('hashchange', function() {
	Router.routing();
});
/*var config = {
		apiKey: "AIzaSyCIC08mGpjcyRVSGjXqZ2Yp2Hx7HdfkDp0",
		authDomain: "productivity-app-5d715.firebaseapp.com",
		databaseURL: "https://productivity-app-5d715.firebaseio.com",
		storageBucket: "productivity-app-5d715.appspot.com",
		messagingSenderId: "237632715933"
};*/

firebase.initializeApp({
    apiKey: "AIzaSyCIC08mGpjcyRVSGjXqZ2Yp2Hx7HdfkDp0",
    authDomain: "productivity-app-5d715.firebaseapp.com",
    databaseURL: "https://productivity-app-5d715.firebaseio.com",
    storageBucket: "productivity-app-5d715.appspot.com",
    messagingSenderId: "237632715933"
});

var database = firebase.database();
/*var connectedRef = database.ref(".info/connected");
connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
    notification('ONLINE');
  } else {
    notification('OFFLINE');
  }
});*/

EventBus.on('getRemoteFBData', function() {
	var categories = {},
		pomodoros ={};
	var repeatCheck = true; /*временный хак для того, чтобы при добавлении таска не отрабатывались действия при событии value*/
	database.ref('tasks/').on('value', function(snap) {
		if(repeatCheck) {
			if(snap.val()) {
				var keys = Object.keys(snap.val());
				var values = Object.values(snap.val());
				for(var i = 0; i < keys.length; i++) {
					EventBus.trigger('addToTaskCollection', [keys[i], values[i]]);
				}
			}
			repeatCheck = false;
		}
	});
		database.ref('Categories/').on('value', function(snap) {
			if(snap.val()) {
				var keys = Object.keys(snap.val());
				var values = Object.values(snap.val());
				for(var i = 0; i < keys.length; i++) {
					categories[keys[i]] = values[i]['value'];
					EventBus.trigger('settingsCategoriesDataSaving', [keys[i], values[i]['value']]);
				}
				LocalStorageData.setToLS('Categories', JSON.stringify(categories));
			}
		});
		database.ref('Pomodoros/').on('value', function(snap) {
			if(snap.val()) {
				var keys = Object.keys(snap.val());
				var values = Object.values(snap.val());
				for(var i = 0; i < keys.length; i++) {
					pomodoros[keys[i]] = values[i]['value'];
					EventBus.trigger('settingsDataSaving', [keys[i], values[i]['value']]);
				}
				LocalStorageData.setToLS('Pomodoros', JSON.stringify(pomodoros));
			}
		});
});

EventBus.on('dataSet', function(dataType) {
	var localSettings = JSON.parse(LocalStorageData.getFromLS(dataType));
	for(var i in localSettings) {
	    database.ref('/' + dataType + '/' + i).set({
	    	value: localSettings[i]
	  	});
	  }
});

EventBus.on('updateSingleTask', function([taskId, propertyName, propertyValue]) {
	var taskKey = taskId;

	var updates = {};
	updates['/tasks/' + taskKey + '/' + propertyName] = propertyValue;

	database.ref().update(updates);
});

EventBus.on('taskAdding', function(task) {
	var newTask = task;
	var newTaskKey = database.ref().child('taskCollection').push().key;

	EventBus.trigger('addToTaskCollection', [newTaskKey, newTask]);

	var updates = {};
	updates['/tasks/' + newTaskKey] = newTask;

	database.ref().update(updates);
});

EventBus.on('taskRemove', function(taskId) {
	database.ref('tasks/' + taskId).remove();
});
window.LocalStorageData = {
	setToLS: function(key, value) {
		localStorage.setItem(key, value);
		//EventBus.trigger('initData', [key, value]);
	},
	getFromLS: function(key) {
		return localStorage.getItem(key);
	},
	removeFromLS: function(key) {
		localStorage.removeItem(key);
	}
}
/* NOT WORKING */
function AuthData() {
	var userName = 'admin';
	var pass = 'admin';

	return {
		getUser: function() {
			return userName;
		},
		getPass: function() {
			return pass;
		}
	}
}

window.auth = function(login, pass) {
	var result = false;
	var authData = new AuthData();
	if(login === authData.getUser() && pass === authData.getPass()) result = true;
	return result;
}

/* NOT WORKING */
function notification(text) {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    var notification = new Notification('App is ' + text + ' now');
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }
}
class HeaderController {
	constructor(view) {
        this.view = view;
	}

	eventListeners() {
        let menu = document.getElementsByClassName('main-menu')[0];
        menu.addEventListener('click', function(e) {
            /*if(event.target.parent.attr('href', '#logout')) {
                LocalStorageData.removeFromLS('username');
                EventBus.trigger('routeChange', '#login');
            } else if(event.target.parent.attr('href', '#settings')) {
                EventBus.trigger('routeChange', '#settings');
            } else if(event.target.parent.attr('href', '#goToReports')) {
                //EventBus.trigger('routeChange', '#reports');
                alert('Sorry, service is not available');
            }*/
        });
    }
}
class HeaderView {
	constructor() {
		this.template = Handlebars.compile($('#headerTemplate').html());
	}

	render(holder) {
        holder.innerHTML += this.template();
		$('.sticky-header').stickyHeader();
        //$('.tooltip').tooltips();
		EventBus.trigger('eventListeners');
	}
}
window.initHeader = function() {
	var headerView = new HeaderView();
	var headerController = new HeaderController(headerView);

    EventBus.on('renderHeader', function(holder) {
        headerView.render(holder);
    });

    EventBus.on('eventListeners', function() {
        headerController.eventListeners();
    });
}
class TaskController {
	constructor(model, view) {
		this.model = model;
		this.view = view;
	}
	
} 

class TaskModel {
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
class TaskView {
	constructor() {
		this.template = Handlebars.compile($('#taskTemplate').html());
	}
	render(task, key) {
		var data = this.template({
			task: {
				category: task.category[0],
				deadline: task.deadline,
				title: task.title,
				description: task.description,
				priority: task.priority.toLowerCase(),
				estimation: task.estimation
			},
			taskKey: key});
		var categoryWrapper = document.getElementsByClassName('category-' + task.category[0] + '-wrapper')[0];
		if(categoryWrapper) {
			categoryWrapper.innerHTML += data;
		} else {
			var newCategory = document.createElement('div');
			var categoryIcon = '<div class="radio-icon icon-{{taskCategoryIndex}}"></div>' +
			'<h3 class="list-type-title category-{{taskCategoryIndex}}">{{taskCategoryName}}</h3>' +
								'<div class="double-span category-{{taskCategoryIndex}}"></div>';
			newCategory.className = 'category-' + task.category[0] + '-wrapper category-wrapper';

			var hCategoryIconTemplate = Handlebars.compile(categoryIcon);
			var categoryData = hCategoryIconTemplate({taskCategoryIndex: task.category[0], taskCategoryName: task.category[1]});

			newCategory.innerHTML = categoryData;
			newCategory.innerHTML += data;
			document.querySelector('.global-tasklist').appendChild(newCategory);
		}
	}
	removeFromPage() {
		
	}
} 
window.initTask = function() {
	var taskCollectionModel = new TaskCollectionModel;
	var taskView = new TaskView();
	var taskModel = new TaskModel();
	var taskController = new TaskController(taskModel, taskView);

	EventBus.on('renderTask', function([task, key]) {
		taskView.render(task, key);
	});
	EventBus.on('addNewTask', function(obj) {
		taskModel.addNew(obj);
	});
	
	EventBus.on('addToTaskCollection', function([key, value]) {
		taskCollectionModel.add(key, value);
	});
	EventBus.on('editExistingTask', function([id, obj]) {
		taskModel.editSingleTask(id, obj);
	});
	EventBus.on('removeTaskFromCollection', function(taskId) {
		taskCollectionModel.removeTask(taskId);
	});
	
}

class TaskCollectionModel {
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
class ActivePageController {
	constructor(model, view) {
		var self = this;
		self.view = view;
		self.model = model;

		document.addEventListener('click', function(event) {
            //event.preventDefault();
		 	var target = event.target;
		 });
	}
	
	
}


class ActivePageModel {
	constructor() {
		
	}

	init() {

	}

	removingItems(id) {
		EventBus.trigger('removeTaskFromCollection', id);
		EventBus.trigger('taskRemove', id);
		EventBus.trigger('clearTaskList');
		EventBus.trigger('getRemoteFBData');
	}
}
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
	
window.initActivePage = function() {
	let activePageModel = new ActivePageModel;
	let activePageView = new ActivePageView();
	let activePageController = new ActivePageController(activePageModel, activePageView);

	EventBus.on('renderActivePage', function() {
		activePageView.render();
        EventBus.trigger('renderModalWindow');
	});
	EventBus.on('removeTask', function(taskId) {
		activePageModel.removingItems(taskId);
	});
	EventBus.on('clearTaskList', function() {
		activePageView.clearTaskListArea();
	});
	EventBus.on('dailyListUpdate', function() {
		activePageView.removingTitle();
		activePageView.clearEmptyWrappers();
	});
}

class LoginController {
	constructor(view) {
	    var self = this;
        self.view = view;
	}

	formValidation() {
        let loginForm = document.getElementsByClassName('login-form')[0];

        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            let inputUser = document.querySelector('input[name="username"]').value;
            let inputPass = document.querySelector('input[name="password"]').value;
            let validation = false;
            if(inputUser.length > 0 && inputPass.length > 0) validation = window.auth(inputUser, inputPass);
            if(validation) {
                LocalStorageData.setToLS('username', inputUser);
                EventBus.trigger('afterLogin');
            } else {
                document.querySelector('input[name="username"]').value = '';
                document.querySelector('input[name="password"]').value = '';
                this.classList.add('validation-error');
            }
        });
	}
}
class LoginView {
	constructor() {
		this.template = Handlebars.compile($('#loginTemplate').html());
	}

	render() {
        let container = document.getElementById('main').querySelector('.container');
        container.innerHTML = this.template();
		document.title = 'Log In';
		document.body.classList.add('login-page');
		EventBus.trigger('loginRendered');
	}

	destroy() {
        document.body.classList.remove('login-page');
	}
}
window.initLogin = function() {
	let loginView = new LoginView();
	let loginController = new LoginController(loginView);

	EventBus.on('renderLogin', function() {
        loginView.render();
    });

    EventBus.on('loginRendered', function() {
        loginController.formValidation();
    });

    EventBus.on('loginDestroy', function() {
        loginView.destroy();
    });
};

class SettingsController {
	constructor(model, view) {
		let self = this;
		self.view = view;
		self.model = model;
		//self.componentData;
		//self.componentView;
	}

    eventListeners() {
		var tabHolder = document.getElementsByClassName('tabs-block')[0];
		var btnHolder = document.getElementsByClassName('btn-group')[0];

        tabHolder.addEventListener('click', function(e) {
            e.preventDefault();
            var target = e.target;
			if(target.tagName == 'A') {
                tabHolder.getElementsByClassName('active')[0].classList.remove('active');
                target.closest('li').classList.add('active');
				switch(target.innerHTML) {
					case 'Pomodoros':
						EventBus.trigger('renderSettingsPomodoros');
					break;
                    case 'Categories':
                        EventBus.trigger('renderSettingsCategories');
                    break;
				}
			}
		});

        btnHolder.addEventListener('click', function(e) {
            e.preventDefault();
            var target = e.target;
            if(target.classList.contains('next-btn')) {
                switch(document.title) {
                    case 'Settings Pomodoros':
                        EventBus.trigger('renderSettingsCategories');
                    break;
                    case 'Settings Categories':
                        EventBus.trigger('routeChange', '#active_page');
                    break;
                }
            }
        });
	}
}


class SettingsModel {
	constructor() {
		let self = this;
	}
	/*move same methods here and just send params*/
}
class SettingsView {
	constructor() {
        this.template = Handlebars.compile($('#settingsTemplate').html());
	}

	render() {
        let container = document.getElementById('main').querySelector('.container');
        container.innerHTML = this.template();
		document.title = 'Settings';
        EventBus.trigger('renderSettingsPomodoros');

        //$('.tabs-block').tabs();
	}
}
window.initSettings = function() {
	let settingsModel = new SettingsModel;
	let settingsView = new SettingsView();
	let settingsController = new SettingsController(settingsModel, settingsView);

    EventBus.on('renderSettings', function() {
        settingsView.render();
        settingsController.eventListeners();
    });
};
function ArrowsController(view) {
	this.view = view;

	this.view.render();

	document.addEventListener('click', function() {
		if(event.target.classList.contains('icon-arrow-left')) {
			EventBus.trigger('routeChange', '#active_page');
		} /*else if(event.target.classList.contains('icon-arrow-right')) {

		}*/
	});
}
function ArrowsTemplate() {
  this.template = '<div class="arrow">' +
		'<button class="arrows arrow-left"><a class="tooltip" title="Go To Task List"><i class="icons icon-arrow-left"></i></a></button>' +
		'<button class="arrows arrow-right"><i class="icons icon-arrow-right"></i></button>' +
	'</div>';
}
ArrowsTemplate.prototype.show = function() {
	return this.template;
}
function ArrowsView(template) {
	this.template = Handlebars.compile(template);
}
ArrowsView.prototype.render = function() {
	var hTemplate = this.template;
	document.querySelector('.content-area').innerHTML += hTemplate();
}
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

	eventListeners() {
        var self = this;
		let form = document.getElementsByClassName('task-modal-form')[0];

		form.addEventListener('submit', function(e) {
			e.preventDefault();
            let newTaskInfo = self.getDataFromModal(form);
            console.log(newTaskInfo);
            EventBus.trigger('addNewTask', newTaskInfo);
		});
	}

	getDataFromModal(form) {
		let title = form.querySelector('#title').value;
		let description = form.querySelector('#description').value;
		let category = [];
		let categories = form.querySelectorAll('input[name="category"]');
		for(var i = 0; i < categories.length; i++) {
			if(categories[i].checked) {
				category[0] = i;
				category[1] = categories[i].parentNode.querySelector('.fake-label').innerHTML;
			}
		}
		let deadline = form.querySelector('#deadline').value;
		let estimations = form.querySelectorAll('.checkbox-rating input');
		let estimation = 0;
		for(var i = 0; i < estimations.length; i++) {
			if(estimations[i].checked) {
				estimation = estimations[i].value;
			}
		}
		let priority = '';
		let priorities = form.querySelectorAll('input[name="priority"]');
		for(var i = 0; i < priorities.length; i++) {
			if(priorities[i].checked) {
				priority = priorities[i].parentNode.querySelector('.fake-label').innerHTML;
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
class ModalWindowModel {
	constructor() {

	}
	getChosenTaskData(id) {
		var obj = {};
		var result = {};
		obj = JSON.parse(LocalStorageData.getFromLS('TaskList'));

		for(var i in obj) {
			if(id == i) {
				result = obj[i];
			}
		}
		
		return result;
	}
}
class ModalWindowView {
	constructor() {
		this.template = Handlebars.compile($('#modalTemplate').html());
	}

	render(mode) {
		var hTemplate = this.template;
		var data = hTemplate({category0: JSON.parse(LocalStorageData.getFromLS('Categories'))['0'][1],
													category1: JSON.parse(LocalStorageData.getFromLS('Categories'))['1'][1],
													category2: JSON.parse(LocalStorageData.getFromLS('Categories'))['2'][1],
													category3: JSON.parse(LocalStorageData.getFromLS('Categories'))['3'][1],
													category4: JSON.parse(LocalStorageData.getFromLS('Categories'))['4'][1],
													mode: mode});
		document.body.innerHTML += data;

        $( ".datepicker" ).datepicker({
            minDate: 0,
            maxDate: "+1Y",
            dateFormat: "MM dd, yy"
        });

		$('.modal').modalWindow();
	}
}

/*ModalWindowView.prototype.pomodorosCheckbox = function() {
	var modal = document.getElementsByClassName('modal-open')[0];
	var estimations = modal.querySelectorAll('.estimation-list');

	for(var i in estimations) {
	}
}*/
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

/*$(function (){
    $(document).ready(dayInit);
    $('#day-chart').click(dayInit);
    function dayInit() {
        $('div.chart').empty();
        

        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $('.chart').addClass('hidden');
        $('#container-day').removeClass('hidden');
    } 
});

$(function (){
    $('#week-chart').click( function() {
        $('div.chart').empty();
        

        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $('.chart').addClass('hidden');
        $('#container-week').removeClass('hidden');
    });
});
 
$(function () {
    $('#month-chart').click(function() {
        $('div.chart').empty();
        

        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $('.chart').addClass('hidden');
        $('#container-month').removeClass('hidden');
    });
});*/

//$(function () {
    /*$(function initCharts(chartName) {
        //$(document).ready(dayInit);
        $('#' + chartName).click(function() {
            $('div.chart').empty();
            chartName;
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            $('.chart').addClass('hidden');
            $('#' + chartName).removeClass('hidden');
        });  
    });*/
    
//});

/*
function ReportsController() {
	location.hash = '#reports';
	document.title = 'Reports';

	ReportsView();

	$('.tabs').tabs('reports');
	$('.icons').tooltips();

	var controllers = document.getElementsByClassName('upper-filter')[0];
	var chartState = controllers.querySelector('.active');	
	var chart = chartState.id;

	ReportsModel(chart);
}*/

/*
function ReportsModel(chartName) {
	var chartCommon = Highcharts.chart('container', {
		chart: {
			backgroundColor: "#2a3f50",
		},
    credits: {enabled: false},
    tooltip: {
      pointFormat: '{series.name}</b>',
      backgroundColor: '#cedeea',
      borderRadius: 2,
      borderWidth: 1,
      borderColor: 'rgba(84, 108, 126, 0.7)',
      style : {
        'color': '#3c5162',
        'font-family': 'robotobold',
        'font-size': '12px',
        'padding': '10px 15px'
      }
	  }
	});
	var dayChart = Highcharts.chart('container', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Total',
                align: 'center',
                verticalAlign: 'middle',
                style: {
                    fontSize: '14px',
                    color: '#fff'
                } 
            },
            height: "100%",
            width: "100%",
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        distance: -30,
                        format: '<b>{point.name}</b>',
                        style: {                        
                            fontWeight: 'bold',                        
                            color: 'white',                        
                            textShadow: false,                        
                            fontSize: '14px',                        
                            borderColor: 'none'                   
                        }
                    },
                    showInLegend: false,
                }
            },
            series: [{
                name: 'Priority',
                colorByPoint: true,
                data: [{
                    name: 'High',
                    color: '#ffa841',
                    y: 4
                }, {
                    name: 'Middle',
                    color: '#fddc43',
                    y: 3
                }, {
                    name: 'Low',
                    color: '#1abc9c',
                    y: 2
                }, {
                    name: 'Urgent',
                    color: '#e16c65',
                    y: 1
                }, {
                    name: 'Failed',
                    color: '#8da5b8',
                    y: 3
                }],
                innerSize: '50%'
            }]
        });
    var weekChart = Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            legend: {
                symbolRadius:0,
                itemStyle: {
                    "color": "#8da5b8"
                },
                itemHoverStyle: {                
                    color: '#fff'            
                }
            },
            xAxis: {
                categories: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
                labels: {
                    style: {
                        "color": "#fff"
                    }
                },
                lineColor: "#fff",
                lineWidth: 1,
                tickColor: 'transparent'
            },
            yAxis: {
                allowDecimals: false,
                min: 0,
                tickInterval: 2,
                labels: {
                    style: {
                        "color": "#fff"
                    }
                },
                gridLineColor: "#8da5b8",
                title: {
                    text: ''
                },
                lineWidth: 1,            
                lineColor: '#fff'
            },
            plotOptions: {
                column: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: 'Urgent',
                data: [1, 2, 3, 1, 2],
                color: '#e16c65',
                stack: 'done',
                borderWidth: 0
            }, {
                name: 'High',
                data: [3, 2, 0, 2, 2],
                color: '#ffa841',
                stack: 'done',
                borderWidth: 0
            }, {
                name: 'Middle',
                data: [2, 3, 0, 2, 1],
                color: '#fddc43',
                stack: 'done',
                borderWidth: 0
            }, {
                name: 'Low',
                data: [3, 0, 2, 2, 1],
                color: '#1abc9c',
                stack: 'done',
                borderWidth: 0
            }, {
                name: 'Failed',
                data: [1, 2, 5, 1, 3],
                color: '#8da5b8',
                stack: 'failed',
                borderWidth: 0
            }]
        });
    var monthChart = Highcharts.chart('container', {
            xAxis: {
                categories: ['1','2','3','4','5','6','7','8','9','10',
                            '11','12','13','14','15','16','17','18','19','20',
                            '21','22','23','24','25','26','27','28','29','30'],
                labels: {
                    style: {
                        "color": "#fff"
                    }
                },
                lineColor: "#fff",
                lineWidth: 1,
                tickColor: 'transparent'
            },
            series: [{
                name: 'Urgent',
                data: [1, 2, 3, 1, 2, 1, 2, 3, 1, 2, 1, 2, 3, 1, 2, 1, 2, 3, 1, 2, 1, 2, 3, 1, 2, 1, 2, 3, 1, 2],
                color: '#e16c65',
                stack: 'done',
                borderWidth: 0
            }, {
                name: 'High',
                data: [3, 2, 0, 2, 2, 3, 2, 0, 2, 2, 3, 2, 0, 2, 2, 3, 2, 0, 2, 2, 3, 2, 0, 2, 2, 3, 2, 0, 2, 2],
                color: '#ffa841',
                stack: 'done',
                borderWidth: 0
            }, {
                name: 'Middle',
                data: [2, 3, 0, 2, 1, 2, 3, 0, 2, 1, 2, 3, 0, 2, 1, 2, 3, 0, 2, 1, 2, 3, 0, 2, 1, 2, 3, 0, 2, 1],
                color: '#fddc43',
                stack: 'done',
                borderWidth: 0
            }, {
                name: 'Low',
                data: [3, 0, 2, 2, 1, 3, 0, 2, 2, 1, 3, 0, 2, 2, 1, 3, 0, 2, 2, 1, 3, 0, 2, 2, 1, 3, 0, 2, 2, 1],
                color: '#1abc9c',
                stack: 'done',
                borderWidth: 0
            }, {
                name: 'Failed',
                data: [1, 2, 5, 1, 3, 1, 2, 5, 1, 3, 1, 2, 5, 1, 3, 1, 2, 5, 1, 3, 1, 2, 5, 1, 3, 1, 2, 5, 1, 3],
                color: '#8da5b8',
                stack: 'failed',
                borderWidth: 0
            }]
        });
    
	var chart = $.extend({}, chartCommon, chartName);
	console.log(chart);


	return chart;
}*/

/*
function ReportsTemplate() {
  var template = renderTemplate();

  function renderTemplate() {
    return '<section class="content-area">' +
		'<header>' +
			'<h1 class="main-page-title">Report</h1>' +
		'</header>' +
		'<div class="upper-filter">' +
			'<button id="dayChart" class="tabs chart-tabs active">Day</button>' +
			'<button id="weekChart" class="tabs chart-tabs">Week</button>' +
			'<button id="monthChart" class="tabs chart-tabs">Month</button>' +
		'</div>' +
		'<div class="reports-area">' +
			'<div id="container" class="chart"></div>' +
		'</div>' +
		'<div class="bottom-filter">' +
			'<button class="tabs">Pomodoros</button>' +
			'<button class="tabs active">Tasks</button>' +
		'</div>' +
	'</section>';
  }
  return template;
}*/

/*
function ReportsView() {
	TaskListAppControllsController();
	var template = ReportsTemplate();
	var hTemplate = Handlebars.compile(template);
	var data = hTemplate();
	document.body.innerHTML += data;
	
	ArrowsController();
	
	return this;
}*/

class TimerController {
	constructor(view, model) {
		this.view = view;
		this.model = model;

		//window.initAppControlls();
		$('.setting-btn').tooltips();
	}
}
class TimerModel {
	constructor() {

	}
	saveActiveTaskInfo(id) {

	}
}
class TimerView {
	constructor() {
		this.template = Handlebars.compile($('#timerTemplate').html());;
	}
	render() {
		document.title = 'Timer';
		document.body.innerHTML = this.template;
	}
}
window.initTimer = function() {
	var timerModel = new TimerModel;
	var timerView = new TimerView();
	var timerController = new TimerController(timerView, timerModel);

	EventBus.on('renderTimer', function(taskId) {
		timerModel.saveActiveTaskInfo(taskId);
		timerView.render();
	});
};
class SettingsCategoriesController {
	constructor(model, view) {
		this.view = view;
		this.model = model;

		document.addEventListener('change', function(event) {
			var target = event.target;
			if(target.closest('.category-input-text')) {
				EventBus.trigger('savingCategoriesData', [target.id, target.value]);

				container.addEventListener('click', function(event) {
					if(event.target.className === 'action-btn save-btn') {
						EventBus.trigger('routeChange', '#active_page');
					} 
				});
			}
		});

		document.addEventListener('click', function(event) {
			var target = event.target;
		 	if(target.closest('#nextToActPage')){
		 		EventBus.trigger('routeChange', '#active_page');
		 	}
		});
	}

	classOnFocus() {
        $('.category-input input').focus();
	}
}


class SettingsCategoriesModel {
	constructor() {
		//let self = this;
		
	}
	savingCategories(index, title) {
		let self = this;
		LocalStorageData.setToLS('Categories', self.parseLSData(index, title));
		EventBus.trigger('dataSet', 'Categories');
	}

	setDefaultData() {
		if(LocalStorageData.getFromLS('Categories') === null && location.hash == '#settings' ) {
			LocalStorageData.setToLS('Categories', JSON.stringify([[0, 'Work'], [1, 'Education'], [2, 'Hobby'], [3, 'Sport'], [4, 'Other']]));
			EventBus.trigger('dataSet', 'Categories');
		}
	}

	parseLSData(index, title) {
		let obj = {};
		obj = JSON.parse(LocalStorageData.getFromLS('Categories'));
		for(var i in obj) {
			if(obj[i][0] == index) {
				obj[i][1] = title;
			}
		}
		return JSON.stringify(obj);
	}

	saveData(id, value) {
		let self = this;
		LocalStorageData.setToLS('Categories', self.parseLSData(id, value));
	}
}
class SettingsCategoriesView {
	constructor() {
		this.template = Handlebars.compile($('#settingsCategoriesTemplate').html());
	}

	render() {
		var hTemplate = this.template;
		var data = hTemplate({category0: JSON.parse(LocalStorageData.getFromLS('Categories'))['0'][1],
							category1: JSON.parse(LocalStorageData.getFromLS('Categories'))['1'][1],
							category2: JSON.parse(LocalStorageData.getFromLS('Categories'))['2'][1],
							category3: JSON.parse(LocalStorageData.getFromLS('Categories'))['3'][1],
							category4: JSON.parse(LocalStorageData.getFromLS('Categories'))['4'][1]});
        document.getElementsByClassName('settings-holder')[0].innerHTML = data;
		document.title = 'Settings Categories';
        document.getElementsByTagName('h2')[0].innerHTML = 'Choose Categories';
	}
}
window.initSettingsCategories = function() {
	var settingsCategoriesModel = new SettingsCategoriesModel;
	settingsCategoriesModel.setDefaultData();
	var settingsCategoriesView = new SettingsCategoriesView();
	var settingsCategoriesController = new SettingsCategoriesController(settingsCategoriesModel, settingsCategoriesView);

	EventBus.on('renderSettingsCategories', function() {
		settingsCategoriesView.render();
        settingsCategoriesController.classOnFocus();

	});
	EventBus.on('settingsCategoriesDataSaving', function([key, value]) {
		settingsCategoriesModel.saveData(key, value);
	});
	EventBus.on('savingCategoriesData', function([index, title]) {
		settingsCategoriesModel.savingCategories(index, title);
	});
};

/**
* @constructor
* @param model
* @param view
* @name SettingsController
*/
class SettingsPomodorosController {
	constructor(model, view) {
		var self = this;
		self.view = view;
		self.model = model;
		self.componentData;
		self.componentView;

		document.addEventListener('click', function(event) {
		 	var target = event.target;
		 	if(target.closest('#nextToSetCat')){
				//self.view.destroy();
				//window.initSettingsCategories();
		 	}
		});
	}

	eventListeners() {
        var holder = document.getElementsByClassName('settings-pomodoros-holder')[0];

        holder.addEventListener('click', function(e) {
            e.preventDefault();
            var target = e.target;
            if(target.closest('.increase')) {
                var valueHolder = target.closest('.counter-holder').querySelector('.value');
                valueHolder.innerHTML = +valueHolder.innerHTML + 1;
            }

            if(target.closest('.decrease')) {
                var valueHolder = target.closest('.counter-holder').querySelector('.value');
                if(valueHolder.innerHTML > 0) valueHolder.innerHTML = +valueHolder.innerHTML - 1;
            }
        });
	}
}


class SettingsPomodorosModel {
	constructor() {
		let self = this;
	}

	savingSettings(index, title) {
		let self = this;
		LocalStorageData.setToLS('Pomodoros', self.parseLSData(index, title));
		EventBus.trigger('dataSet', 'Pomodoros');
	}

	setDefaultData() {
		if(LocalStorageData.getFromLS('Pomodoros') === null && location.hash == '#settings') {
			LocalStorageData.setToLS('Pomodoros', JSON.stringify([['workTime', 25], ['shortBreak', 1], ['workIteration', 5], ['longBreak', 45]]));
			EventBus.trigger('dataSet', 'Pomodoros');
		}
	}

	parseLSData(elemId, newValue) {
		let obj = {};
		obj = JSON.parse(LocalStorageData.getFromLS('Pomodoros'));
		for(var i in obj) {
			if(obj[i][0] === elemId) {
				obj[i][1] = newValue;
			}
		}
		return JSON.stringify(obj);
	}

	saveData(id, value) {
		let self = this;
		LocalStorageData.setToLS('Pomodoros', self.parseLSData(id, value));
	}
}
class SettingsPomodorosView {
	constructor() {
		this.template = Handlebars.compile($('#settingsPomodorosTemplate').html());
	}

	render() {
		let hTemplate = this.template;
		let data = hTemplate({workTimeIterations: JSON.parse(LocalStorageData.getFromLS('Pomodoros'))[0][1],
							workIterations: JSON.parse(LocalStorageData.getFromLS('Pomodoros'))[2][1],
							shortBreakIterations: JSON.parse(LocalStorageData.getFromLS('Pomodoros'))[1][1],
							longBreakIterations: JSON.parse(LocalStorageData.getFromLS('Pomodoros'))[3][1]});
		document.getElementsByClassName('settings-holder')[0].innerHTML = data;
		document.title = 'Settings Pomodoros';
		document.getElementsByTagName('h2')[0].innerHTML = 'Pomodoros settings';
	}

	/*destroy() {
		let container = document.getElementById('settings-pomodoros');
		if(container) {
			document.getElementById('settings-container').removeChild(container);
		}
	}*/
}
window.initSettingsPomodoros = function() {
	let settingsPomodorosModel = new SettingsPomodorosModel;
	settingsPomodorosModel.setDefaultData();
	let settingsPomodorosView = new SettingsPomodorosView();
	let settingsPomodorosController = new SettingsPomodorosController(settingsPomodorosModel, settingsPomodorosView);
	//settingsPomodorosView.render();

	//settingsPomodorosController.component = CycleController();

	//app.settingsController.componentData = new CycleInput();
	//app.settingsController.componentView = new CycleTimeline(self.componentData);

	EventBus.on('renderSettingsPomodoros', function() {
		settingsPomodorosView.render();
        settingsPomodorosController.eventListeners();
	});
	EventBus.on('settingsDataSaving', function([key, value]) {
		settingsPomodorosModel.saveData(key, value);
	});
	EventBus.on('settingInputsChanges', function([elem, value]) {
		settingsPomodorosModel.savingSettings(elem, parseInt(value));
	});
};

function CycleController() {
	var workTime = new Inputs({
		elem: document.getElementById('workTime'),
		step: 5,
		minValue: 15,
		maxValue: 40
	});
	var shortBreak = new Inputs({
		elem: document.getElementById('shortBreak'),
		step: 1,
		minValue: 1,
		maxValue: 15
	});

	var workIteration = new Inputs({
		elem: document.getElementById('workIteration'),
		step: 1,
		minValue: 1,
		maxValue: 5
	});

	var longBreak = new Inputs({
		elem: document.getElementById('longBreak'),
		step: 5,
		minValue: 30,
		maxValue: 60
	});


	var timeline = new Timeline({
		elems: [
			'work-time',
			'short-break',
			//'work-iteration',
			'long-break'
		],
		valuesWrap: [
			document.getElementById('work-time-count'),
			document.getElementById('short-break-count'),
			document.getElementById('long-break-count')
		],
		repeats: document.getElementById('work-iteration-count')
	});
}
function CycleInput() {
	var self = this;
	this.settingsContainer = document.getElementsByClassName('settings')[0];
	this.controlElementContainers = document.getElementsByClassName('counter');
	this.controlValues = this.getValues();
	//this.controlValue = document.getElementsByClassName('iterations');

	this.settingsContainer.addEventListener('click', function() {
		var target = event.target;
		if(target.closest('.minus')) {
			self.valueDecrease(target);
		} else if(target.closest('.plus')) {
			self.valueIncrease(target);
		}
	});
}

CycleInput.prototype = {
	valueIncrease: function(target) {
		
	},
	valueDecrease: function(target) {

	},
	getValues: function() {
		var obj = {};
		var iterations = document.getElementsByClassName('iterations');
		for(var i = 0; i < this.controlElementContainers.length; i++) {
			obj[this.controlElementContainers[i].id] = iterations[i].value;
		}
		return obj;
	}
}
//var inputChanges = '0'; 

function Inputs(options) {
	var elem = options.elem;
	var step = options.step; 
	var minValue = options.minValue;
	var maxValue = options.maxValue;
	var counter = elem.querySelector('.iterations');

	elem.addEventListener('click', function() {
		if(event.target.closest('.minus')) {
			valueDecrease();
		//	inputChanges = '1';
		} else if(event.target.closest('.plus')) {
			valueIncrease();
			//inputChanges = '1';
		}
		
	});

	function valueDecrease() {
		if(counter.value <= minValue) return;
		counter.value = parseInt(counter.value) - step;
	}
	function valueIncrease() {
		if(counter.value >= maxValue) return;
		counter.value = parseInt(counter.value) + step;
	}
}
function CycleTimeline(model) {
	this.model = model;
}
function Timeline(options) {
	var elem = options.elems;
	var counter = options.valuesWrap;

	var repeats = options.repeats;
	render();
	countCyclePoints();
	/*window.addEventListener('load', function() {
		render();
		countCyclePoints();
	});*/
	window.addEventListener('click', function(event) {
		if(event.target.closest('.icon')){
			render();
			countCyclePoints();
			var changedElem = event.target.parentNode.parentNode;
			EventBus.trigger('settingInputsChanges', [changedElem.id, changedElem.querySelector('.iterations').value]);
		}
	});

	function render() { 
		if(repeats.value > 0) {
			resetTimeline('timeline');
			for(var i = 0; i < 2; i++) {
				for(var j = 0; j < repeats.value*2; j++) {
					var li = document.createElement('li');
					document.getElementsByClassName('timeline')[0].appendChild(li);
				}
			}
			fullCycle();
		}
	}

	function widthCount(i) { 
		var oneMinute = 100 / ((parseInt(counter[0].value) + parseInt(counter[1].value)) * repeats.value * 2 + parseInt(counter[2].value));
		return oneMinute * counter[i].value + '%';
	}

	function fullCycle() {
		var timelineItems = document.querySelector('.timeline').childNodes;
		for(var i = 0; i < timelineItems.length; i++) {
			if((i % 2) === 0) {
				timelineItems[i].className = 'work-time timeline-blocks yellow';
			} else if((i % 2) !== 0) {
				timelineItems[i].className = 'short-break timeline-blocks blue';
			}
		}
		var li = document.createElement('li');
		li.className = 'long-break timeline-blocks blue';
		var temp = document.querySelector('.timeline').childNodes;
		document.querySelector('.timeline').insertBefore(li, temp[((temp.length)/2)]);

		setWidth();
	}
	function setWidth() {
		for(var i = 0; i < elem.length; i++) {
			for(var j = 0; j < document.getElementsByClassName(elem[i]).length; j++) {
				document.getElementsByClassName(elem[i])[j].style.width = widthCount(i);
			}
		}
	}

	function resetTimeline(classRemoveName) { //sets empty timeline
		var timeline = document.querySelector('.' + classRemoveName);
		while(timeline.lastChild) timeline.removeChild(timeline.lastChild);
	}

	function countCyclePoints() {
		resetTimeline('timeline-scale');
		var oneMinute = 100 / ((parseInt(counter[0].value) + parseInt(counter[1].value)) * repeats.value * 2 + parseInt(counter[2].value));
		var totalMinutes = (parseInt(counter[0].value) + parseInt(counter[1].value)) * repeats.value * 2 + parseInt(counter[2].value);
		var totalPoints = Math.floor(totalMinutes / 30);
		for(var i = 0; i < totalPoints; i++) {
			var li = document.createElement('li');
			var text = document.createTextNode(pointInnerText(i));
			li.appendChild(text);
			li.className = 'hourPin';
			li.style.width = oneMinute * 30 + '%';
			document.querySelector('.timeline-scale').appendChild(li);
		}

		document.querySelector('.full-cycle-point').style.paddingLeft = (parseInt(document.querySelector('.work-time').style.width) + 
																					parseInt(document.querySelector('.short-break').style.width)) * repeats.value + 
																					parseInt(document.querySelector('.long-break').style.width) + '%';
		var text = document.createTextNode((parseInt(counter[0].value) + parseInt(counter[1].value)) * repeats.value + parseInt(counter[2].value));
		//document.getElementsByClassName('full-cycle-point')[0].appendChild(text);
	}
	function pointInnerText(i) {
		var totalMinutes = (parseInt(counter[0].value) + parseInt(counter[1].value)) * repeats.value * 2 + parseInt(counter[2].value);
		var text = [];
		for(var j = 0; j < totalMinutes; j += 30) {
			if(j === 30) text.push(j + 'min');
			else if(j >= 60) {
				if(j % 60 === 0) text.push(j / 60 + 'h');
				else if(j % 60 !== 0) text.push(parseInt(j / 60) + 'h ' + 30 + 'min');
			}
		}
		return text[i];
	}
} 
