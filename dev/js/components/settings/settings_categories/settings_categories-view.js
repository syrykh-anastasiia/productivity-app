import Handlebars from './../../../libs/handlebars-v4.0.5.js';
/**
* @constructor
* @param template
* @name SettingsCategoriesView
*/
export default class SettingsCategoriesView {
	constructor(template) {
		this.template = template;
	}
/**
* @memberof SettingsCategoriesView
* @summary render function
*/
	render() {
		var hTemplate = Handlebars.compile(this.template);
		var data = hTemplate({category0: JSON.parse(LocalStorageData.getFromLS('Categories'))['0'][1],
							category1: JSON.parse(LocalStorageData.getFromLS('Categories'))['1'][1],
							category2: JSON.parse(LocalStorageData.getFromLS('Categories'))['2'][1],
							category3: JSON.parse(LocalStorageData.getFromLS('Categories'))['3'][1],
							category4: JSON.parse(LocalStorageData.getFromLS('Categories'))['4'][1]});
		document.getElementById('settings-container').innerHTML += data;
		document.title = 'Settings Categories';
	}
	destroy() {
		
	}
}