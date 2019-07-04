/**
* @constructor
* @param template
* @name SettingsView
*/
import Handlebars from './../../libs/handlebars-v4.0.5.js';

export default class SettingsView {
	constructor(template) {
		this.template = template;
	}
	render() {
		let hTemplate = Handlebars.compile(this.template);
		let data = hTemplate();
		document.body.innerHTML += data;
		document.title = 'Settings';
	}
}