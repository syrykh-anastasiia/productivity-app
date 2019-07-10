class SettingsController {
	constructor(model, view) {
		let self = this;
		self.view = view;
		self.model = model;
		//self.componentData;
		//self.componentView;
	}
	changesTracking() {
		var container = document.getElementsByClassName('btn-group')[0];

		container.addEventListener('click', function(event) {
            if(event.target.classList.contains('next-btn')) {
                //self.model.updateData([elem, parseInt(value)]);
                //EventBus.trigger('savingPomodorosData', [elem, parseInt(value)]);
                //window.initSettingsCategories();

                /*working variant*/
                //EventBus.trigger('renderSettingsCategories');
            }
            if(event.target.classList.contains('save-btn')) {
				//self.model.updateData([elem, parseInt(value)]);
				//EventBus.trigger('savingPomodorosData', [elem, parseInt(value)]);
				//window.initSettingsCategories();

				/*working variant*/
				//EventBus.trigger('renderSettingsCategories');
			} 
		});
	}
}

