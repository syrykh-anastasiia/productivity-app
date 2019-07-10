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
		settingsPomodorosController.changesTracking();
	});
};
