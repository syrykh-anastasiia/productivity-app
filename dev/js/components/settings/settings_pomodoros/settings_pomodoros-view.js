/**
* @constructor
* @param template
* @name SettingsPomodorosView
*/

class SettingsPomodorosView {
	constructor() {
		this.template = Handlebars.compile($('#settingsPomodorosTemplate').html());
	}

	render() {
		//AppControllsController();
		let hTemplate = this.template;
		let data = hTemplate({workTimeIterations: JSON.parse(LocalStorageData.getFromLS('Pomodoros'))[0][1],
							workIterations: JSON.parse(LocalStorageData.getFromLS('Pomodoros'))[2][1],
							shortBreakIterations: JSON.parse(LocalStorageData.getFromLS('Pomodoros'))[1][1],
							longBreakIterations: JSON.parse(LocalStorageData.getFromLS('Pomodoros'))[3][1]});
		document.getElementById('settings-container').innerHTML += data;
		document.title = 'Settings Pomodoros';
	}
	destroy() {
		let container = document.getElementById('settings-pomodoros');
		if(container) {
			document.getElementById('settings-container').removeChild(container);
		}
	}
}