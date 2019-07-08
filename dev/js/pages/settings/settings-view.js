/**
* @constructor
* @param template
* @name SettingsView
*/

class SettingsView {
	constructor() {
        this.template = Handlebars.compile($('#settingsTemplate').html());
	}

	render() {
		document.body.innerHTML += this.template();
		document.title = 'Settings';
        EventBus.trigger('renderSettingsPomodoros');
	}
}