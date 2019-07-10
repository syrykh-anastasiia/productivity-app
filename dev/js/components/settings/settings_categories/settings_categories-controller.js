class SettingsCategoriesController {
	constructor(model, view) {
		this.view = view;
		this.model = model;

		document.addEventListener('change', function(event) {
			var target = event.target;
			if(target.closest('.category-input-text')) {
				EventBus.trigger('savingCategoriesData', [target.id, target.value]);

				container.addEventListener('click', function(event) {
					if(event.target.className === 'action-btn save-btn') {
						EventBus.trigger('routeChange', '#active_page');
					} 
				});
			}
		});

		document.addEventListener('click', function(event) {
			var target = event.target;
		 	if(target.closest('#nextToActPage')){
		 		EventBus.trigger('routeChange', '#active_page');
		 	}
		});
	}
}

