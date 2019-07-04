import Handlebars from './../../../libs/handlebars-v4.0.5.js';
/**
* @constructor
* @param template
* @name SettingsPomodorosView
*/

export default class SettingsPomodorosView {
	constructor(template) {
		this.template = template;
	}
/**
* @memberof LoginView
* @summary render function
*/
	render() {
		//AppControllsController();
		let hTemplate = Handlebars.compile(this.template);
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