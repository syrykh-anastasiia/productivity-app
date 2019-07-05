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
		console.log('1');
		switch(currentLocation) {
			case 'login':
				window.initLogin();
				EventBus.trigger('renderLogin');
			break;
			case 'settings':
				window.initSettings();
				//EventBus.trigger('renderSettings');				
			break;
			case 'active_page':
				window.initActivePage();
				//EventBus.trigger('renderActivePage');	
			break;
		}
	}
}

window.addEventListener('load', function() {
	let currentHash = location.hash;
	if(currentHash.length === 0 || currentHash === '#') {
		location.hash = '#login';
	} else {
		Router.routing(location.hash.substr(1));
	}
});

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

/*
class LocalStorageData {
    setToLS(key, value) {
        localStorage.setItem(key, value);
        //EventBus.trigger('initData', [key, value]);
	}

    getFromLS(key) {
        return localStorage.getItem(key);
	}

    removeFromLS(key) {
        localStorage.removeItem(key);
	}
}*/

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

/*
window.auth = function(login, pass) {
	var result = false;
	var authData = new AuthData();
	if(login === authData.getUser() && pass === authData.getPass()) result = true;
	return result;
}*/

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
class AppControllsController {
	constructor(view) {
		this.view = view;
		this.view.render();
		
		document.addEventListener('click', function(event) {
			if(event.target.closest('#logout')) {
				LocalStorageData.removeFromLS('username');
				EventBus.trigger('routeChange', '#login');
			} else if(event.target.closest('#settings')) {
				EventBus.trigger('routeChange', '#settings');
			} else if(event.target.closest('#goToReports')) {
				//EventBus.trigger('routeChange', '#reports');
				alert('Sorry, service is not available');
			}
		});
	}
}
class AppControllsTemplate {
	constructor() {
		this.template = '<div class="app-settings">' +
			'<button class="setting-btn app-controll" id="goToReports">' +
				'<a class="tooltip" title="Go To Reports"><i class="icon-statistics setting-icons"></i></a>' +
			'</button>' +
			'<button class="setting-btn app-controll" id="settings">' +
				'<a class="tooltip" title="Go To Settings"><i class="icon-settings setting-icons"></i></a>' +
			'</button>' +
			'<button class="setting-btn app-controll" id="logout">' +
				'<a class="tooltip" title="Logout"><i class="icon-logout setting-icons"></i></a>' +
			'</button>' +
		'</div>';
	}
	show() {
		return this.template;
	}
 
}
/*import Handlebars from '../../libs/handlebars-v4.0.5.js';*/

class AppControllsView {
	constructor(template) {
		this.template = template;
	}
	render() {
		var hTemplate = Handlebars.compile(this.template);
		var data = hTemplate();
		document.body.innerHTML = data;
	}
}
/*import AppControllsTemplate from './app-controlls-template.js';
import AppControllsView from './app-controlls-view.js';
import AppControllsController from './app-controlls-controller.js';*/

window.initAppControlls = function() {
	var appControllsTemplate = new AppControllsTemplate;
	var appControllsView = new AppControllsView(appControllsTemplate.show());
	var appControllsController = new AppControllsController(appControllsView);
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
class TaskTemplate {
	constructor() {
		this.template = '<section class="tasks-categories">' +
							    '<div class="span category-{{task.category}}"></div>' +
							    	'<div class="task-block block-border category-{{task.category}}" data-key="{{taskKey}}">' +
											'<button class="hidden add-to-trash category-{{task.category}}">' +
												'<i class="icon-trash removeItem"></i>' +
											'</button>' +
											'<p class="task-deadline">{{task.deadline}}</p>' +
											'<div class="task-description-wrapper">' +
												'<h4 class="task-name category-{{task.category}}">{{task.title}}</h4>' +
												'<p class="task-desciption">{{task.description}}</p>' +
											'</div>' +
											'<button class="open-timer pomodoro-priority priority-{{task.priority}}"><i class="icon-toggle"></i><span class="priority-num">{{task.estimation}}</span></button>' +
											'<div class="task-edits">' +
													'<button class="arrow-to-top edit-btn"><i class="icon-arrows-up"></i></button>' +
													'<button id="editBtn" class="open-modal-btn edit-btn"><i class="icon-edit"></i></button>' +
												'</div>' +
								'</div>' +
					'</section>';
	}
	show() {
		return this.template;
	}
}
/*import Handlebars from '../../libs/handlebars-v4.0.5.js';*/

class TaskView {
	constructor(template) {
		this.template = template;
	}
	render(task, key) {
		var hTemplate = Handlebars.compile(this.template);
		var data = hTemplate({
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
			document.querySelector('.global-task-list').appendChild(newCategory);
		}
		document.querySelector('.btn-groups').classList.remove('hidden');
	}
	removeFromPage() {
		
	}
} 
/*import TaskCollectionModel from '../task-collection/task-collection-model.js';
import TaskTemplate from './task-template.js';
import TaskView from './task-view.js';
import TaskModel from './task-model.js';
import TaskController from './task-controller.js';*/

window.initTask = function() {
	var taskCollectionModel = new TaskCollectionModel;
	var taskTemplate = new TaskTemplate;
	var taskView = new TaskView(taskTemplate.show());
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
/**
* @constructor
* @param model
* @param view
* @name SettingsController
*/
class SettingsController {
	constructor(model, view) {
		let self = this;
		self.view = view;
		self.model = model;
		self.componentData;
		self.componentView;

		window.initAppControlls();
		
		var $tabs = $('#tabs');
		$tabs.tabs();

		$('.setting-btn').tooltips();
	}
	changesTracking() {
		var container = document.getElementsByClassName('btn-group')[0];

		var btnTemplate = '<button class="action-btn back-btn">Back</button>' +
			'<button class="action-btn save-btn">Save</button>';
		container.innerHTML = btnTemplate;

		container.addEventListener('click', function(event) {
			if(event.target.className === 'action-btn save-btn') {
				//self.model.updateData([elem, parseInt(value)]);
				//EventBus.trigger('savingPomodorosData', [elem, parseInt(value)]);
				window.initSettingsCategories();
			} 
		});
	}
}


/**
* @constructor
* @name SettingsModel
*/
class SettingsModel {
	constructor() {
		let self = this;
	}
	/*move same methods here and just send params*/
}
/**
* @constructor
* @name SettingsTemplate
*/
class SettingsTemplate {
	constructor() {
		this.template = '<div class="content-area">' +
		'<header>' +
			'<h1 class="main-page-title">Settings</h1>' +
			'<h3 class="title-hint">SET TEXT HERE</h3>' +
		'</header>' +
		'<div id="tabs" class="tabs-block">' +
			'<button class="tabs"><a href="#settings_pomodoros">Pomodoros</a></button>' +
			'<button class="tabs"><a href="#settings_categories">Categories</a></button>' +
		'</div>' +
		'<div class="settings" id="settings-container"></div>'
	'</div>';
	}
/**
* @memberof SettingsTemplate
*/
	show() {
		return this.template;
	}
}
/**
* @constructor
* @param template
* @name SettingsView
*/
/*import Handlebars from '../../libs/handlebars-v4.0.5.js';*/

class SettingsView {
	constructor(template) {
		this.template = template;
	}
	render() {
		let hTemplate = Handlebars.compile(this.template);
		let data = hTemplate();
		document.body.innerHTML += data;
		document.title = 'Settings';
	}
}
/*import SettingsModel from './settings-model.js'
import SettingsTemplate from './settings-template.js';
import SettingsView from './settings-view.js';
import SettingsController from './settings-controller.js';

import SettingsCategories from '../../components/settings/settings_categories/settings_categories.js';
import SettingsPomodoros from '../../components/settings/settings_pomodoros/settings_pomodoros.js';*/

window.initSettings = function() {
	let settingsModel = new SettingsModel;
	let settingsTemplate = new SettingsTemplate;
	let settingsView = new SettingsView(settingsTemplate.show());
	let settingsController = new SettingsController(settingsModel, settingsView);
	settingsView.render();

	window.initSettingsPomodoros();
};
/**
* @constructor
* @param view
* @name LoginController
* @summary Login controller
*/
class LoginController {
	constructor(view) {
		if(LocalStorageData.getFromLS('username') !== null) {
			this.findNextPage();
		}
		this.view = view;
		let auth = window.auth;
		let self = this;
		document.addEventListener('submit', function(event) {
			event.preventDefault();
			let inputUser = document.getElementById('login').value;
			let inputPass = document.getElementById('pass').value;
			let validation = false;
			if(inputUser.length > 0 && inputPass.length > 0) validation = auth(inputUser, inputPass);
			document.getElementById('login').value = '';
			document.getElementById('pass').value = '';
			if(validation) {
				LocalStorageData.setToLS('username', inputUser);
				self.findNextPage();
			}
		});
	}
	findNextPage() {
		if(LocalStorageData.getFromLS('Pomodoros') === null && LocalStorageData.getFromLS('Categories') === null) {
			EventBus.trigger('routeChange', '#settings');
		} else {
			EventBus.trigger('routeChange', '#active_page');
		}
	}
} 
/**
* @constructor
* @name LoginTemplate
* @summary Login template
*/
class LoginTemplate {
  constructor() {
    this.template = '<div class="main-wrapper">' +
      '<div class="login-content-area">' +
        '<h1 class="alt-logo-text">Pomodoro Login Page</h1>' +
        '<div class="logo"></div>' +
        '<form id="loginForm" class="log-in">' +
           '<label class="input-wrap">' +
             '<input id="login" class="form-input login-input" type="text" placeholder="Username" autocomplete="off"><i class="icon-login login"></i>' + 
           '</label>' +
           '<span class="hidden error-text">Lorem ipsum dolor sit amet, consectetu adipiscing elit</span>' +
           '<label class="input-wrap">' +
             '<input id="pass" class="form-input pass-input" type="password" placeholder="Password" autocomplete="off"><i class="icon-password password"></i>' +
          ' </label>' +
           '<input type="submit" value="Log In">' +
        '</form>' +
      '</div>' +
      '</div>';
  }
/**
* @memberof LoginTemplate
* @summary show function
*/
  show() {
    return this.template;
  }
}
/**
* @constructor
* @param template
* @name LoginView
* @summary Login views
*/
/*import Handlebars from '../../libs/handlebars-v4.0.5.js';*/

class LoginView {
	constructor(template) {
		this.template = template;
	}
/**
* @memberof LoginView
* @summary render function
*/
	render() {
		let hTemplate = Handlebars.compile(this.template);
		let data = hTemplate();
		document.body.innerHTML = data;
		document.title = 'Log In';
	}
}
/*import LoginTemplate from './login-template.js';
import LoginView from './login-view.js';
import LoginController from './login-controller.js';*/

window.initLogin = function() {
	let loginTemplate = new LoginTemplate;
	let loginView = new LoginView(loginTemplate.show());
	let loginController = new LoginController(loginView);

	EventBus.on('renderLogin', function() {
		loginView.render();
	});
};

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
/**
* @constructor
* @name ActivePageTemplate
*/
class ActivePageTemplate {
	constructor() {
		this.template = '<div class="content-area">' +
		'<header class="main-page-title">' +
			'<button id="addBtn" class="add-task-btn"><h1 class="add-task">Daily Task List +</h1></button>' +
		'</header>' +
		'<div class="title-to-task">' +
			'<p class="top-hint"><i class="icon-arrow_circle"></i><br>Add your first task</p>' +
		'</div>' +
		'<div class="today-task-list task-list">' +
		'</div>' +
			'<div class="hidden btn-groups">' +
				'<div class="global-group">' +
					'<button id="globalListToggle" class="global-list accordion-header">Global list<i class="accordion-icon icon-global-list-arrow-down"></i></button>' +
					'<div class="selection-type accordion-body">' +
						'<button class="priority-filter tabs active">All</button>' +
						'<button class="priority-filter tabs">Urgent</button>' +
						'<button class="priority-filter tabs">High</button>' +
						'<button class="priority-filter tabs">Middle</button>' +
						'<button class="priority-filter tabs">Low</button>' +
					'</div>' +
				'</div>' +
				/*'<div class="global-list-hide selection-group accordion-body">' +
					'<button class="tabs">Select All</button>' +
					'<button class="tabs">Deselect All</button>' +
				'</div>' +*/
			'</div>' +
			'<div class="global-list-hide global-task-list task-list accordion-body">' +
			'</div>' +	
		'</div>';
	}
/**
* @memberof ActivePageTemplate
*/
	show() {
		return this.template;
	}
  }
/**
* @constructor
* @param template
* @name ActivePageView
*/
/*import Handlebars from '../../libs/handlebars-v4.0.5.js';*/

class ActivePageView {
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
	
/*import ActivePageModel from './active_page-model.js';
import ActivePageTemplate from './active_page-template.js';
import ActivePageView from './active_page-view.js';
import ActivePageController from './active_page-controller.js';*/

window.initActivePage = function() {
	let activePageModel = new ActivePageModel;
	let activePageTemplate = new ActivePageTemplate;
	let activePageView = new ActivePageView(activePageTemplate.show());
	let activePageController = new ActivePageController(activePageModel, activePageView);

	EventBus.on('renderActivePage', function() {
		activePageView.render();
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

class StickyHeaderController {
	constructor(view) {
		var self = this;
		self.view = view;
		window.onscroll = function() {
			if(document.title == 'Task List') { //hack for some time
				self.view.run();
			}
		};
	}
}
class StickyHeaderTemplate {
	constructor() {
		this.template = '<div id="stickyHeader" class="hidden-header-wrapper hidden">' +
		'<header class="hidden-header">' +
			'<a href="/"><img class="hidden-header-logo" src="img/Logo.svg"></a>' +
			'<div class="nav-settings">' +
				'<button class="nav-settings-btn app-controll"><a class="tooltip" title="New Task"><i id="addIcon" class="icon-add setting-icons"></i></a></button>' +
				'<button class="nav-settings-btn app-controll"><a class="tooltip" title="To Trash"><i id="openTrash" class="icon-trash setting-icons"></i><span class="hidden trash-count-mark"></span></a></button>' +
				'<button class="nav-settings-btn app-controll"><a class="tooltip" title="To Reports"><i id="goToReports" class="icon-statistics setting-icons"></i></a></button>' +
				'<button class="nav-settings-btn app-controll"><a class="tooltip" title="To Settings"><i id="settings" class="icon-settings setting-icons current"></i></a></button>' +
				'<button class="nav-settings-btn app-controll"><a class="tooltip" title="Log out"><i id="logout2" class="icon-logout setting-icons"></i></a></button>' +
			'</div>' +
		'</header>' +
	'</div>';
	}
	show() {
		return this.template;
	}
}
/*import Handlebars from '../../../libs/handlebars-v4.0.5.js';*/

class StickyHeaderView {
	constructor(template) {
		var self = this;
		self.hTemplate = Handlebars.compile(template);
		var data = self.hTemplate();
		document.body.innerHTML = data;
	}
	run(scrolled) {
		var scrolled = window.pageYOffset || document.documentElement.scrollTop;
		if(!document.getElementById('stickyHeader')) document.body.innerHTML = self.template;
		
		var header = document.getElementById('stickyHeader');
		if(scrolled > 200) header.classList.remove('hidden');
		else if(scrolled <= 200) header.classList.add('hidden');
	}
}
/*import StickyHeaderTemplate from './sticky-header-template.js';
import StickyHeaderView from './sticky-header-view.js';
import StickyHeaderController from './sticky-header-controller.js';*/

window.initStickyHeader = function() {
	var stickyHeaderTemplate = new StickyHeaderTemplate;
	var stickyHeaderView = new StickyHeaderView(stickyHeaderTemplate.show());
	var stickyHeaderController = new StickyHeaderController(stickyHeaderView);
}
class TaskListAppControllsController {
	constructor(view) {
		this.view = view;
		window.initAppControlls();
		this.view.render();

		document.addEventListener('click', function(event) {
			if(event.target.closest('#openTrash')) {
				var trashes = document.getElementsByClassName('add-to-trash');
				for(var i = 0; i < trashes.length; i++) {
					if(trashes[i].classList.contains('hidden')) {
						trashes[i].classList.remove('hidden');
					}
					else trashes[i].classList.add('hidden');
				}
			}
		});
	}
	
}
class TaskListAppControllsTemplate {
	constructor() {
		this.template = '<button class="setting-btn app-controll" id="addIcon">' +
  					'<a class="tooltip" title="Add New Task"><i class="icon-add setting-icons"></i></a>' + 
  				'</button>' +
      			'<button class="setting-btn app-controll" id="openTrash">' + 
      				'<a class="tooltip" title="Add To Trash"><i class="icon-trash setting-icons"></i><span class="hidden trash-count-mark"></span></a>' +
      			'</button>';
	}
	show() {
		return this.template;
	}
}
class TaskListAppControllsView {
	constructor(template) {
		this.template = template;
	}
	render() {
		var controllsWrapper = document.querySelector('.app-settings');
		controllsWrapper.insertAdjacentHTML('afterbegin', this.template);
	}
}
/*import TaskListAppControllsTemplate from './task-list-app-controlls-template.js';
import TaskListAppControllsView from './task-list-app-controlls-view.js';
import TaskListAppControllsController from './task-list-app-controlls-controller.js';*/

window.initTaskListControlls = function() {
	var taskListAppControllsTemplate = new TaskListAppControllsTemplate;
	var taskListAppControllsView = new TaskListAppControllsView(taskListAppControllsTemplate.show());
	var taskListAppControllsController = new TaskListAppControllsController(taskListAppControllsView);
}
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
class TimerTemplate {
	constructor() {
		this.template = '<section class="content-area">' +
		'<header>' +
			'<h1 class="main-page-title">1. Creating a New Design</h1>' +
			'<h3 class="small-title-hint">Lorem ipsum dolor sit amet consectetur adipiscing</h3>' +
		'</header>' +
		'<div class="timer-area">' +
			'<ul class="pomodoros">' +
				'<li class="pomodoro-item">' +
					'<img src="img/tomato.svg" alt="tomato">' +
				'</li>' +
				'<li class="pomodoro-item">' +
					'<img src="img/tomato.svg" alt="tomato">' +
				'</li>' +
				'<li class="pomodoro-item">' +
					'<img src="img/tomato.svg" alt="tomato">' +
				'</li>' +
			'</ul>' +
			'<div class="timer-container border-' + '">' +
				'<div class="timer-out">' +
					'<div class="spin timer"></div>' +
					'<div class="addition-spin timer"></div>' +
					'<div class="mask"></div>' +
				'</div>' +
				'<div class="timer-in">' +
					'<p class="timer-text">Let\'s do it</p>' +
					'<p class="hidden timer-text double-line"><span>6</span><br> min</p>' +
					'<p class="hidden timer-text">Break<br> is over</p>' +
					'<p class="hidden timer-text triple-line">Break<br><span>3</span><br>min</p>' +
					'<p class="hidden timer-text trile-text">You Completed Task</p>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="hidden btn-group">' +
			'<button class="action-btn fail-btn">Fail Pomodora</button>' +
			'<button class="action-btn finish-btn">Finish Pomodora</button>' +
		'</div>' +
		'<div class="hidden btn-group">' +
			'<button class="action-btn start-btn">Start Pomodora</button>' +
			'<button class="hidden action-btn finish-task-btn">Finish Task</button>' +
		'</div>' +
		'<button class="action-btn start-btn">Start</button>' +
	'</section>';
	}
	show() {
		return this.template;
	}
}
class TimerView {
	constructor(template) {
		this.template = template;
	}
	render() {
		document.title = 'Timer';
		document.body.innerHTML = this.template;
	}
}
/*import TimerTemplate from './timer-template.js';
import TimerView from './timer-view.js';
import TimerModel from './timer-model.js';
import TimerController from './timer-controller.js';*/

window.initTimer = function() {
	var timerModel = new TimerModel;
	var timerTemplate = new TimerTemplate;
	var timerView = new TimerView(timerTemplate.show());
	var timerController = new TimerController(timerView, timerModel);

	EventBus.on('renderTimer', function(taskId) {
		timerModel.saveActiveTaskInfo(taskId);
		timerView.render();
	});
};
/**
* @constructor
* @param model
* @param view
* @name SettingsCategoriesController
*/
class SettingsCategoriesController {
	constructor(model, view) {
		this.view = view;
		this.model = model;

		document.addEventListener('change', function(event) {
			var target = event.target;
			if(target.closest('.category-input-text')) {
				EventBus.trigger('savingCategoriesData', [target.id, target.value]);
				var container = document.querySelector('.btn-group');

				var btnTemplate = '<button class="action-btn back-btn">Back</button>' +
					'<button class="action-btn save-btn">Save</button>';
				container.innerHTML = btnTemplate;

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
}


/**
* @constructor
* @name SettingsCategoriesModel
*/
class SettingsCategoriesModel {
	constructor() {
		//let self = this;
		
	}
	savingCategories(index, title) {
		let self = this;
		LocalStorageData.setToLS('Categories', self.parseLSData(index, title));
		EventBus.trigger('dataSet', 'Categories');
	}
/**
* @memberof SettingsCategoriesModel
*/
	setDefaultData() {
		if(LocalStorageData.getFromLS('Categories') === null  && location.hash == '#settings_categories') {
			LocalStorageData.setToLS('Categories', JSON.stringify([[0, 'Work'], [1, 'Education'], [2, 'Hobby'], [3, 'Sport'], [4, 'Other']]));
			EventBus.trigger('dataSet', 'Categories');
		}
	}
/**
* @memberof SettingsCategoriesModel
*/
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
/**
* @memberof SettingsCategoriesModel
*/
	saveData(id, value) {
		let self = this;
		LocalStorageData.setToLS('Categories', self.parseLSData(id, value));
	}
}
/**
* @constructor
* @name SettingsCategoriesTemplate
*/
class SettingsCategoriesTemplate {
	constructor() {
		this.template = '<div class="settings-categories" id="settings-categories">' +
			'<ul class="choose-categories">' +
				'<li class="category-item">' +
					'<input id="input-work" class="category-item-hidden" type="radio" name="category"><label for="input-work" class="category-radio-icon work"></label>' +
					'<input id="0" class="category-input-text" type="text" value="{{category0}}">' +
				'</li>' +
				'<li class="category-item">' +
					'<input id="input-educat" class="category-item-hidden" type="radio" name="category"><label for="input-educat" class="category-radio-icon education"></label>' +
					'<input id="1" class="category-input-text" type="text" value="{{category1}}">' +
				'</li>' +
				'<li class="category-item">' +
					'<input id="input-hobby" class="category-item-hidden" type="radio" name="category"><label for="input-hobby" class="category-radio-icon hobby"></label>' +
					'<input id="2" class="category-input-text" type="text" value="{{category2}}">' +
				'</li>' +
				'<li class="category-item">' +
					'<input id="input-sport" class="category-item-hidden" type="radio" name="category"><label for="input-sport" class="category-radio-icon sport"></label>' +
					'<input id="3" class="category-input-text" type="text" value="{{category3}}">' +
				'</li>' +
				'<li class="category-item">' +
					'<input id="input-other" class="category-item-hidden" type="radio" name="category"><label for="input-other" class="category-radio-icon other"></label>' +
					'<input id="4" class="category-input-text" type="text" value="{{category4}}">' +
				'</li>' +
			'</ul>' +
		'<div class="btn-group">' +
			'<button id="nextToActPage" class="action-btn next-btn">Next</button>' +
		'</div>' +
		'</div>';
	}
/**
* @memberof SettingsCategoriesTemplate
*/
	show() {
		return this.template;
	}
}
/*import Handlebars from '../../../libs/handlebars-v4.0.5.js';*/
/**
* @constructor
* @param template
* @name SettingsCategoriesView
*/
class SettingsCategoriesView {
	constructor(template) {
		this.template = template;
	}
/**
* @memberof SettingsCategoriesView
* @summary render function
*/
	render() {
		var hTemplate = Handlebars.compile(this.template);
		var data = hTemplate({category0: JSON.parse(LocalStorageData.getFromLS('Categories'))['0'][1],
							category1: JSON.parse(LocalStorageData.getFromLS('Categories'))['1'][1],
							category2: JSON.parse(LocalStorageData.getFromLS('Categories'))['2'][1],
							category3: JSON.parse(LocalStorageData.getFromLS('Categories'))['3'][1],
							category4: JSON.parse(LocalStorageData.getFromLS('Categories'))['4'][1]});
		document.getElementById('settings-container').innerHTML += data;
		document.title = 'Settings Categories';
	}
	destroy() {
		
	}
}
/*
import SettingsCategoriesModel from './settings_categories-model.js';
import SettingsCategoriesTemplate from './settings_categories-template.js';
import SettingsCategoriesView from './settings_categories-view.js';
import SettingsCategoriesController from './settings_categories-controller.js';
*/

window.initSettingsCategories = function() {
	var settingsCategoriesModel = new SettingsCategoriesModel;
	settingsCategoriesModel.setDefaultData();
	var settingsCategoriesTemplate = new SettingsCategoriesTemplate;
	var settingsCategoriesView = new SettingsCategoriesView(settingsCategoriesTemplate.show());
	var settingsCategoriesController = new SettingsCategoriesController(settingsCategoriesModel, settingsCategoriesView);
	settingsCategoriesView.render();

	EventBus.on('renderSettingsCategories', function() {
		settingsCategoriesView.render();
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
		let self = this;
		self.view = view;
		self.model = model;
		self.componentData;
		self.componentView;

		document.addEventListener('click', function(event) {
		 	var target = event.target;
		 	if(target.closest('#nextToSetCat')){
				self.view.destroy();
				window.initSettingsCategories();
		 	}
		});
	}
	changesTracking() {
		let self = this;
		let container = document.querySelector('.btn-group');

		let btnTemplate = '<button class="action-btn back-btn">Back</button>' +
			'<button class="action-btn save-btn">Save</button>';
		container.innerHTML = btnTemplate;

		container.addEventListener('click', function(event) {
			if(event.target.className === 'action-btn save-btn') {
				//self.model.updateData([elem, parseInt(value)]);
				//EventBus.trigger('savingPomodorosData', [elem, parseInt(value)]);
				self.view.destroy();
				window.initSettingsCategories();
			} 
		});
	}
}


/**
* @constructor
* @name SettingsModel
*/
class SettingsPomodorosModel {
	constructor() {
		let self = this;
	}
	savingSettings(index, title) {
		let self = this;
		LocalStorageData.setToLS('Pomodoros', self.parseLSData(index, title));
		EventBus.trigger('dataSet', 'Pomodoros');
	}
/**
* @memberof SettingsModel
* @summary setDefaultData function
*/
	setDefaultData() {
		if(LocalStorageData.getFromLS('Pomodoros') === null && location.hash == '#settings') {
			LocalStorageData.setToLS('Pomodoros', JSON.stringify([['workTime', 25], ['shortBreak', 1], ['workIteration', 5], ['longBreak', 45]]));
			EventBus.trigger('dataSet', 'Pomodoros');
		}
	}
/**
* @memberof SettingsModel
* @summary parseLSData function
*/
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
/**
* @memberof SettingsModel
* @summary saveData function
*/
	saveData(id, value) {
		let self = this;
		LocalStorageData.setToLS('Pomodoros', self.parseLSData(id, value));
	}
}
/**
* @constructor
* @name SettingsPomodorosTemplate
*/
class SettingsPomodorosTemplate {
	constructor() {
		this.template = '<div id="settings-pomodoros">' +
		'<div class="settings-pomodoros">' +
			'<section class="settings-items">' +
				'<div class="circle yellow"></div>' +
				'<h4 class="settings-items-title">WORK TIME</h4>' +
				'<div id="workTime" class="counter">' +
					'<button id="work-time-minus" class="minus icon"><i class="icon-minus"></i></button>' +
					'<input id="work-time-count" class="iterations" type="text" value="{{workTimeIterations}}" size="2" readonly> min' +
					'<button id="work-time-plus" class="plus icon"><i class="icon-add"></i></button>' +
				'</div>' +
				'<br><span>Lorem ipsum dolor sit amet consectetur adipiscing</span>' +
			'</section>' +
			'<section class="settings-items">' +
				'<div class="circle light-blue"></div>' +
				'<h4 class="settings-items-title">WORK ITERATION</h4>' +
				'<div id="workIteration" class="counter">' +
					'<button id="work-iteration-minus" class="minus icon"><i class="icon-minus"></i></button>' +
					'<input id="work-iteration-count" class="iterations" type="text" value="{{workIterations}}" size="2" readonly>' +
					'<button id="work-iteration-plus" class="plus icon"><i class="icon-add"></i></button>' +
				'</div>' +
				'<br><span>Lorem ipsum dolor sit amet consectetur</span>' +
			'</section>' +
			'<section class="settings-items">' +
				'<div class="circle blue"></div>' +
				'<h4 class="settings-items-title">SHORT BREAK</h4>' +
				'<div id="shortBreak" class="counter">' +
					'<button id="short-break-minus" class="minus icon"><i class="icon-minus"></i></button>' +
					'<input id="short-break-count" class="iterations" type="text" value="{{shortBreakIterations}}" size="2" readonly> min' +
					'<button id="short-break-plus" class="plus icon"><i class="icon-add"></i></button>' +
				'</div>' +
				'<br><span>Lorem ipsum dolor sit amet consectetur adipiscing sed do eiusmod tempor</span>' +
			'</section>' +
			'<section class="settings-items">' +
				'<div class="circle blue"></div>' +
				'<h4 class="settings-items-title">LONG BREAK</h4>' +
				'<div id="longBreak" class="counter">' +
					'<button id="long-break-minus" class="minus icon"><i class="icon-minus"></i></button>' +
					'<input id="long-break-count" class="iterations" type="text" size="2" value="{{longBreakIterations}}" readonly> min' +
					'<button id="long-break-plus" class="plus icon"><i class="icon-add"></i></button>' +
				'</div>' +
				'<br><span>Lorem ipsum dolor sit amet consectetur adipiscing</span>' +
			'</section>' +
		'</div>' +
		'<section class="your-cycle">' +
			'<h2 class="cycle-title">Your cycle</h2>' +
			'<p class="full-cycle-point">Full cycle: </p>' +
			'<ul class="timeline blue"></ul>' +
			'<ul class="timeline-scale"></ul>' +
		'</section>' +
		'<div class="btn-group">' +
			'<button id="nextToSetCat" class="action-btn next-btn">Next</button>' +
		'</div>'
		'</div>';
	}
/**
* @memberof SettingsPomodorosTemplate
* @summary show function
*/
	show(){
		return this.template;
	}
}

/*import Handlebars from '../../../libs/handlebars-v4.0.5.js';*/
/**
* @constructor
* @param template
* @name SettingsPomodorosView
*/

class SettingsPomodorosView {
	constructor(template) {
		this.template = template;
	}
/**
* @memberof LoginView
* @summary render function
*/
	render() {
		//AppControllsController();
		let hTemplate = Handlebars.compile(this.template);
		let data = hTemplate({workTimeIterations: JSON.parse(LocalStorageData.getFromLS('Pomodoros'))[0][1],
							workIterations: JSON.parse(LocalStorageData.getFromLS('Pomodoros'))[2][1],
							shortBreakIterations: JSON.parse(LocalStorageData.getFromLS('Pomodoros'))[1][1],
							longBreakIterations: JSON.parse(LocalStorageData.getFromLS('Pomodoros'))[3][1]});
		document.getElementById('settings-container').innerHTML += data;
		document.title = 'Settings Pomodoros';
	}
	destroy() {
		let container = document.getElementById('settings-pomodoros');
		if(container) {
			document.getElementById('settings-container').removeChild(container);
		}
	}
}
/*import SettingsPomodorosModel from './settings_pomodoros-model.js'
import SettingsPomodorosTemplate from './settings_pomodoros-template.js';
import SettingsPomodorosView from './settings_pomodoros-view.js';
import SettingsPomodorosController from './settings_pomodoros-controller.js';

import CycleController from './cycle/cycle-controller.js';*/

window.initSettingsPomodoros = function() {
	let settingsPomodorosModel = new SettingsPomodorosModel;
	settingsPomodorosModel.setDefaultData();
	let settingsPomodorosTemplate = new SettingsPomodorosTemplate;
	let settingsPomodorosView = new SettingsPomodorosView(settingsPomodorosTemplate.show());
	let settingsPomodorosController = new SettingsPomodorosController(settingsPomodorosModel, settingsPomodorosView);
	settingsPomodorosView.render();

	settingsPomodorosController.component = CycleController();

	//app.settingsController.componentData = new CycleInput();
	//app.settingsController.componentView = new CycleTimeline(self.componentData);
	EventBus.on('renderSettings', function() {
		settingsPomodorosView.render();
	});
	EventBus.on('settingsDataSaving', function([key, value]) {
		settingsPomodorosModel.saveData(key, value);
	});
	EventBus.on('settingInputsChanges', function([elem, value]) {
		settingsPomodorosModel.savingSettings(elem, parseInt(value));
		settingsPomodorosController.changesTracking();
	});
};

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
    $(function initCharts(chartName) {
        //$(document).ready(dayInit);
        $('#' + chartName).click(function() {
            $('div.chart').empty();
            chartName;
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            $('.chart').addClass('hidden');
            $('#' + chartName).removeClass('hidden');
        });  
    });
    
//});

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
}
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
}
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
}
function ReportsView() {
	TaskListAppControllsController();
	var template = ReportsTemplate();
	var hTemplate = Handlebars.compile(template);
	var data = hTemplate();
	document.body.innerHTML += data;
	
	ArrowsController();
	
	return this;
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
class ModalWindowTemplate {
	constructor() {
		this.template = '<div id="modalWindow" class="modal modal-open hidden">' +
		'<div class="cover-wrapper"></div>' +
		'<div class="modal-window">' +
			'<div class="btns-group">' +
				'<button class="modal-action-btn"><i id="cancelAdding" class="icon-close"></i></button>' +
				'<button class="modal-action-btn"><i id="confirmAdding" class="{{mode}} icon-check"></i></button>' +
			'</div>' +
			'<div class="add-edit-task">' +
				'<h2 class="modal-title add-task-window">{{mode}} Task</h2>' +
				'<form class="modal-form">' +
					'<label for="title" class="input-title">TITLE</label>' +
					'<input id="title" type="text" class="input-content" placeholder="Add title here">' +
					'<label for="description" class="input-title">DESCRIPTION</label>' +
					'<input id="description" type="text" class="input-content" placeholder="Add description here">' +
					'<label for="category" class="input-title">CATEGORY</label>' +
					'<ul id="category" class="category-block input-content">' +
						'<li class="category-item">' +
							'<input id="input-work" class="list-item radio-list-item category-list" type="radio" name="category" checked><label for="input-work" class="c-radio-icon work"></label><span class="input-text">{{category0}}</span>' +
						'</li>' +
						'<li class="category-item">' +
							'<input id="input-educat" class="list-item radio-list-item category-list" type="radio" name="category"><label for="input-educat" class="c-radio-icon education"></label><span class="input-text">{{category1}}</span>' +
						'</li>' +
						'<li class="category-item">' +
							'<input id="input-hobby" class="list-item radio-list-item category-list" type="radio" name="category"><label for="input-hobby" class="c-radio-icon hobby"></label><span class="input-text">{{category2}}</span>' +
						'</li>' +
						'<li class="category-item">' +
							'<input id="input-sport" class="list-item radio-list-item category-list" type="radio" name="category"><label for="input-sport" class="c-radio-icon sport"></label><span class="input-text">{{category3}}</span>' +
						'</li>' +
						'<li class="category-item">' +
							'<input id="input-other" class="list-item radio-list-item category-list" type="radio" name="category"><label for="input-other" class="c-radio-icon other"></label><span class="input-text">{{category4}}</span>' +
						'</li>' +
					'</ul>' +
					'<label for="deadline" class="input-title">DEADLINE</label>' +
					'<input id="deadline" type="text" class="input-content" value="" placeholder="Pick a date">' +
					'<label for="estimation" class="input-title">ESTIMATION</label>' +
					'<ul id="estimation" class="estimation-block input-content">' +
						'<li class="estimation-item">' +
							'<input id="input-1-pomodoro" class="list-item checkbox-list-item estimation-list" type="checkbox"><label for="input-1-pomodoro" class="checkbox-element"></label>' +
						'</li>' +
						'<li class="estimation-item">' +
							'<input id="input-2-pomodoro" class="list-item checkbox-list-item estimation-list" type="checkbox"><label for="input-2-pomodoro" class="checkbox-element"></label>' +
						'</li>' +
						'<li class="estimation-item">' +
							'<input id="input-3-pomodoro" class="list-item checkbox-list-item estimation-list" type="checkbox"><label for="input-3-pomodoro" class="checkbox-element"></label>' +
						'</li>' +
						'<li class="estimation-item">' +
							'<input id="input-4-pomodoro" class="list-item checkbox-list-item estimation-list"  type="checkbox"><label for="input-4-pomodoro" class="checkbox-element"></label>' +
						'</li>' +
						'<li class="estimation-item">' +
							'<input id="input-5-pomodoro" class="list-item checkbox-list-item estimation-list"  type="checkbox"><label for="input-5-pomodoro" class="checkbox-element"></label>' +
						'</li>' +
					'</ul>' +
					'<label for="priority" class="input-title">PRIORITY</label>' +
					'<ul id="priority" class="priority-block input-content">' +
						'<li class="priority-item">' +
							'<input id="input-urgent" class="list-item radio-list-item priority-list" type="radio" name="priority" checked><label for="input-urgent" class="p-radio-icon urgent"></label><span class="input-text priority-value">Urgent</span>' +
						'</li>' +
						'<li class="priority-item">' +
							'<input id="input-high" class="list-item radio-list-item priority-list" type="radio" name="priority"><label for="input-high" class="p-radio-icon high"></label><span class="input-text priority-value">High</span>' +
						'</li>' +
						'<li class="priority-item">' +
							'<input id="input-middle" class="list-item radio-list-item priority-list" type="radio" name="priority"><label for="input-middle" class="p-radio-icon middle"></label><span class="input-text priority-value">Middle</span>' +
						'</li>' +
						'<li class="priority-item">' +
							'<input id="input-low" class="list-item radio-list-item priority-list" type="radio" name="priority"><label for="input-low" class="p-radio-icon low"></label><span class="input-text priority-value">Low</span>' +
						'</li>' +
					'</ul>' +
				'</form>' +	
			'</div>' +
		'</div>' +
	'</div>';
	}
	show() {
		return this.template;
	}
  
}
/*import Handlebars from '../../../libs/handlebars-v4.0.5.js';*/

class ModalWindowView {
	constructor(template) {
		this.template = template;
	}
	render(mode) {
		var hTemplate = Handlebars.compile(this.template);
		var data = hTemplate({category0: JSON.parse(LocalStorageData.getFromLS('Categories'))['0'][1],
													category1: JSON.parse(LocalStorageData.getFromLS('Categories'))['1'][1],
													category2: JSON.parse(LocalStorageData.getFromLS('Categories'))['2'][1],
													category3: JSON.parse(LocalStorageData.getFromLS('Categories'))['3'][1],
													category4: JSON.parse(LocalStorageData.getFromLS('Categories'))['4'][1],
													mode: mode});
		document.body.innerHTML += data;
	}
	destroy() {
		var modal = document.querySelector('.modal');
		if(modal) document.body.removeChild(modal);
	}
}

/*ModalWindowView.prototype.pomodorosCheckbox = function() {
	var modal = document.getElementsByClassName('modal-open')[0];
	var estimations = modal.querySelectorAll('.estimation-list');

	for(var i in estimations) {
	}
}*/
/*import ModalWindowTemplate from './modal-window-template.js';
import ModalWindowView from './modal-window-view.js';
import ModalWindowModel from './modal-window-model.js';
import ModalWindowController from './modal-window-controller.js';*/

window.initModalWindow = function() {
	var modalWindowTemplate = new ModalWindowTemplate;
	var modalWindowView = new ModalWindowView(modalWindowTemplate.show());
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
	this.template = template;
}
ArrowsView.prototype.render = function() {
	var hTemplate = Handlebars.compile(this.template);
	var data = hTemplate();
	document.querySelector('.content-area').innerHTML += data;
}
/*import Inputs from './cycle-model.js';
import Timeline from './cycle-view.js';*/

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
