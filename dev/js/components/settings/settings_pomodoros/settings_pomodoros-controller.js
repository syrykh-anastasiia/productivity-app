/**
* @constructor
* @param model
* @param view
* @name SettingsController
*/
class SettingsPomodorosController {
	constructor(model, view) {
		var self = this;
		self.view = view;
		self.model = model;
		self.componentData;
		self.componentView;

		document.addEventListener('click', function(event) {
		 	var target = event.target;
		 	if(target.closest('#nextToSetCat')){
				//self.view.destroy();
				//window.initSettingsCategories();
		 	}
		});
	}

	eventListeners() {
        var holder = document.getElementsByClassName('settings-pomodoros-holder')[0];

        holder.addEventListener('click', function(e) {
            e.preventDefault();
            var target = e.target;
            if(target.closest('.increase')) {
                var valueHolder = target.closest('.counter-holder').querySelector('.value');
                valueHolder.innerHTML = +valueHolder.innerHTML + 1;
            }

            if(target.closest('.decrease')) {
                var valueHolder = target.closest('.counter-holder').querySelector('.value');
                if(valueHolder.innerHTML > 0) valueHolder.innerHTML = +valueHolder.innerHTML - 1;
            }
        });
	}
}

