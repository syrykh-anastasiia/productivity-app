import EventBus from './../../eventBus.js';
export default class AppControllsController {
	constructor(view) {
		this.view = view;
		this.view.render();
		
		document.addEventListener('click', function(event) {
			if(event.target.closest('#logout')) {
				LocalStorageData.removeFromLS('username');
				EventBus.trigger('routeChange', '#login');
			} else if(event.target.closest('#settings')) {
				EventBus.trigger('routeChange', '#settings');
			} else if(event.target.closest('#goToReports')) {
				//EventBus.trigger('routeChange', '#reports');
				alert('Sorry, service is not available');
			}
		});
	}
}