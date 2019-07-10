class SettingsPomodorosView {
	constructor() {
		this.template = Handlebars.compile($('#settingsPomodorosTemplate').html());
	}

	render() {
		let hTemplate = this.template;
		let data = hTemplate({workTimeIterations: JSON.parse(LocalStorageData.getFromLS('Pomodoros'))[0][1],
							workIterations: JSON.parse(LocalStorageData.getFromLS('Pomodoros'))[2][1],
							shortBreakIterations: JSON.parse(LocalStorageData.getFromLS('Pomodoros'))[1][1],
							longBreakIterations: JSON.parse(LocalStorageData.getFromLS('Pomodoros'))[3][1]});
		document.getElementsByClassName('settings-holder')[0].innerHTML = data;
		document.title = 'Settings Pomodoros';
		document.getElementsByTagName('h2')[0].innerHTML = 'Pomodoros settings';
	}

	/*destroy() {
		let container = document.getElementById('settings-pomodoros');
		if(container) {
			document.getElementById('settings-container').removeChild(container);
		}
	}*/
}