/*import EventBus from './../../../eventBus.js';*/
/**
* @constructor
* @param model
* @param view
* @name SettingsController
*/
export default class SettingsPomodorosController {
	constructor(model, view) {
		let self = this;
		self.view = view;
		self.model = model;
		self.componentData;
		self.componentView;

		document.addEventListener('click', function(event) {
		 	var target = event.target;
		 	if(target.closest('#nextToSetCat')){
				self.view.destroy();
				window.initSettingsCategories();
		 	}
		});
	}
	changesTracking() {
		let self = this;
		let container = document.querySelector('.btn-group');

		let btnTemplate = '<button class="action-btn back-btn">Back</button>' +
			'<button class="action-btn save-btn">Save</button>';
		container.innerHTML = btnTemplate;

		container.addEventListener('click', function(event) {
			if(event.target.className === 'action-btn save-btn') {
				//self.model.updateData([elem, parseInt(value)]);
				//EventBus.trigger('savingPomodorosData', [elem, parseInt(value)]);
				self.view.destroy();
				window.initSettingsCategories();
			} 
		});
	}
}

