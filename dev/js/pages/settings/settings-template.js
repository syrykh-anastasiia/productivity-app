/**
* @constructor
* @name SettingsTemplate
*/
export default class SettingsTemplate {
	constructor() {
		this.template = '<div class="content-area">' +
		'<header>' +
			'<h1 class="main-page-title">Settings</h1>' +
			'<h3 class="title-hint">SET TEXT HERE</h3>' +
		'</header>' +
		'<div id="tabs" class="tabs-block">' +
			'<button class="tabs"><a href="#settings_pomodoros">Pomodoros</a></button>' +
			'<button class="tabs"><a href="#settings_categories">Categories</a></button>' +
		'</div>' +
		'<div class="settings" id="settings-container"></div>'
	'</div>';
	}
/**
* @memberof SettingsTemplate
*/
	show() {
		return this.template;
	}
}