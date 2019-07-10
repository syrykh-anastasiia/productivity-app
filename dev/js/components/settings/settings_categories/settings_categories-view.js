class SettingsCategoriesView {
	constructor() {
		this.template = Handlebars.compile($('#settingsCategoriesTemplate').html());
	}

	render() {
		var hTemplate = this.template;
		var data = hTemplate({category0: JSON.parse(LocalStorageData.getFromLS('Categories'))['0'][1],
							category1: JSON.parse(LocalStorageData.getFromLS('Categories'))['1'][1],
							category2: JSON.parse(LocalStorageData.getFromLS('Categories'))['2'][1],
							category3: JSON.parse(LocalStorageData.getFromLS('Categories'))['3'][1],
							category4: JSON.parse(LocalStorageData.getFromLS('Categories'))['4'][1]});
        document.getElementsByClassName('settings-holder')[0].innerHTML = data;
		document.title = 'Choose Categories';
        document.getElementsByTagName('h2')[0].innerHTML = 'Pomodoros settings';
	}
}