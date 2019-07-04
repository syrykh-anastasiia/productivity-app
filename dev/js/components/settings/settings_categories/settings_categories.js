import EventBus from '../../../eventBus.js';

import SettingsCategoriesModel from './settings_categories-model.js';
import SettingsCategoriesTemplate from './settings_categories-template.js';
import SettingsCategoriesView from './settings_categories-view.js';
import SettingsCategoriesController from './settings_categories-controller.js';

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
