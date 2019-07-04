import EventBus from '../../../eventBus.js';

import SettingsPomodorosModel from './settings_pomodoros-model.js'
import SettingsPomodorosTemplate from './settings_pomodoros-template.js';
import SettingsPomodorosView from './settings_pomodoros-view.js';
import SettingsPomodorosController from './settings_pomodoros-controller.js';

import CycleController from './cycle/cycle-controller.js';

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
