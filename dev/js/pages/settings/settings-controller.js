/**
* @constructor
* @param model
* @param view
* @name SettingsController
*/
class SettingsController {
	constructor(model, view) {
		let self = this;
		self.view = view;
		self.model = model;
		self.componentData;
		self.componentView;

		//window.initAppControlls();
		
		var $tabs = $('#tabs');
		$tabs.tabs();

		$('.setting-btn').tooltips();
	}
	changesTracking() {
		var container = document.getElementsByClassName('btn-group')[0];

		var btnTemplate = '<button class="action-btn back-btn">Back</button>' +
			'<button class="action-btn save-btn">Save</button>';
		container.innerHTML = btnTemplate;

		container.addEventListener('click', function(event) {
			if(event.target.className === 'action-btn save-btn') {
				//self.model.updateData([elem, parseInt(value)]);
				//EventBus.trigger('savingPomodorosData', [elem, parseInt(value)]);
				//window.initSettingsCategories();
                EventBus.trigger('renderSettingsCategories');
			} 
		});
	}
}

