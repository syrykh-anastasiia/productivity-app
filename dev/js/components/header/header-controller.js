class HeaderController {
	constructor(view) {
        this.view = view;
	}

	eventListeners() {
        let menu = document.getElementsByClassName('main-menu')[0];
        menu.addEventListener('click', function(e) {
            /*if(event.target.parent.attr('href', '#logout')) {
                LocalStorageData.removeFromLS('username');
                EventBus.trigger('routeChange', '#login');
            } else if(event.target.parent.attr('href', '#settings')) {
                EventBus.trigger('routeChange', '#settings');
            } else if(event.target.parent.attr('href', '#goToReports')) {
                //EventBus.trigger('routeChange', '#reports');
                alert('Sorry, service is not available');
            }*/
        });
    }
}