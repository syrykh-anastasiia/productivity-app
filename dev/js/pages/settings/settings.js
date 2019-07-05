window.initSettings = function() {
	let settingsModel = new SettingsModel;
	let settingsView = new SettingsView();
	let settingsController = new SettingsController(settingsModel, settingsView);
	settingsView.render();

	window.initSettingsPomodoros();
};