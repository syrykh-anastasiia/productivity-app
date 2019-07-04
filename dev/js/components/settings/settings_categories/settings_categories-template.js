/**
* @constructor
* @name SettingsCategoriesTemplate
*/
export default class SettingsCategoriesTemplate {
	constructor() {
		this.template = '<div class="settings-categories" id="settings-categories">' +
			'<ul class="choose-categories">' +
				'<li class="category-item">' +
					'<input id="input-work" class="category-item-hidden" type="radio" name="category"><label for="input-work" class="category-radio-icon work"></label>' +
					'<input id="0" class="category-input-text" type="text" value="{{category0}}">' +
				'</li>' +
				'<li class="category-item">' +
					'<input id="input-educat" class="category-item-hidden" type="radio" name="category"><label for="input-educat" class="category-radio-icon education"></label>' +
					'<input id="1" class="category-input-text" type="text" value="{{category1}}">' +
				'</li>' +
				'<li class="category-item">' +
					'<input id="input-hobby" class="category-item-hidden" type="radio" name="category"><label for="input-hobby" class="category-radio-icon hobby"></label>' +
					'<input id="2" class="category-input-text" type="text" value="{{category2}}">' +
				'</li>' +
				'<li class="category-item">' +
					'<input id="input-sport" class="category-item-hidden" type="radio" name="category"><label for="input-sport" class="category-radio-icon sport"></label>' +
					'<input id="3" class="category-input-text" type="text" value="{{category3}}">' +
				'</li>' +
				'<li class="category-item">' +
					'<input id="input-other" class="category-item-hidden" type="radio" name="category"><label for="input-other" class="category-radio-icon other"></label>' +
					'<input id="4" class="category-input-text" type="text" value="{{category4}}">' +
				'</li>' +
			'</ul>' +
		'<div class="btn-group">' +
			'<button id="nextToActPage" class="action-btn next-btn">Next</button>' +
		'</div>' +
		'</div>';
	}
/**
* @memberof SettingsCategoriesTemplate
*/
	show() {
		return this.template;
	}
}