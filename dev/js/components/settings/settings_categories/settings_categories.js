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
