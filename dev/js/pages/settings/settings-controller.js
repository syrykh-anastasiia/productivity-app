class SettingsController {
	constructor(model, view) {
		let self = this;
		self.view = view;
		self.model = model;
		//self.componentData;
		//self.componentView;
	}

    eventListeners() {
		var tabHolder = document.getElementsByClassName('tabs-block')[0];
		var btnHolder = document.getElementsByClassName('btn-group')[0];

        tabHolder.addEventListener('click', function(e) {
            var target = e.target;
			if(target.tagName == 'A') {
                tabHolder.querySelector('li').classList.remove('active');
                target.closest('li').classList.add('active');
				switch(target.innerHTML) {
					case 'Pomodoros':
						EventBus.trigger('renderSettingsPomodoros');
					break;
                    case 'Categories':
                        EventBus.trigger('renderSettingsCategories');
                    break;
				}
			}
		});

        btnHolder.addEventListener('click', function(e) {
            var target = e.target;
            if(target.classList.contains('next-btn')) {
                switch(document.title) {
                    case 'Settings Pomodoros':
                        EventBus.trigger('renderSettingsCategories');
                    break;
                    case 'Settings Categories':
                        EventBus.trigger('renderActivePage');
                    break;
                }
            }
        });
	}
}

