import SettingsModel from './settings-model.js'
import SettingsTemplate from './settings-template.js';
import SettingsView from './settings-view.js';
import SettingsController from './settings-controller.js';

import SettingsCategories from './../../components/settings/settings_categories/settings_categories.js';
import SettingsPomodoros from './../../components/settings/settings_pomodoros/settings_pomodoros.js';

window.initSettings = function() {
	let settingsModel = new SettingsModel;
	let settingsTemplate = new SettingsTemplate;
	let settingsView = new SettingsView(settingsTemplate.show());
	let settingsController = new SettingsController(settingsModel, settingsView);
	settingsView.render();

	window.initSettingsPomodoros();
};