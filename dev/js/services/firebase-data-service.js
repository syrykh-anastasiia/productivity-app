import EventBus from './../eventBus.js';

var config = {
		apiKey: "AIzaSyCIC08mGpjcyRVSGjXqZ2Yp2Hx7HdfkDp0",
		authDomain: "productivity-app-5d715.firebaseapp.com",
		databaseURL: "https://productivity-app-5d715.firebaseio.com",
		storageBucket: "productivity-app-5d715.appspot.com",
		messagingSenderId: "237632715933"
};
firebase.initializeApp(config);

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