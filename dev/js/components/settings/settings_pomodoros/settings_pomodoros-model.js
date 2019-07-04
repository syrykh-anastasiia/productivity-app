import EventBus from './../../../eventBus.js';
/**
* @constructor
* @name SettingsModel
*/
export default class SettingsPomodorosModel {
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