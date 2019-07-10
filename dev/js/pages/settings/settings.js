window.initSettings = function() {
	let settingsModel = new SettingsModel;
	let settingsView = new SettingsView();
	let settingsController = new SettingsController(settingsModel, settingsView);

    EventBus.on('renderSettings', function() {
        settingsView.render();
        settingsController.eventListeners();
    });
};