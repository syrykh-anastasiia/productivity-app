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
        let container = document.getElementById('main').querySelector('.container');
        container.innerHTML = this.template();
		document.title = 'Settings';
        EventBus.trigger('renderSettingsPomodoros');
	}
}