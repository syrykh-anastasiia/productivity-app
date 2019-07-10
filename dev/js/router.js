class Router {
	static routing(location) {
		let currentLocation = location || window.location.hash.substr(1);
		EventBus.trigger('getRemoteFBData');
		switch(currentLocation) {
			case 'login':
				EventBus.trigger('renderLogin');
			break;
			case 'settings':
				EventBus.trigger('renderSettings');
			break;
			case 'active_page':
				EventBus.trigger('renderActivePage');
			break;
		}
	}
}

EventBus.on('routeChange', function(route) {
	route = route.substr(1);
	switch(route) {
		case 'login':
			location.hash = '#login';
		break;
		case 'settings':
			location.hash = '#settings';
		break;
		case 'active_page':
			location.hash = '#active_page';
		break;
	}
});

EventBus.on('afterLogin', function() {
    if(LocalStorageData.getFromLS('Pomodoros') === null && LocalStorageData.getFromLS('Categories') === null) {
        EventBus.trigger('routeChange', '#settings');
    } else {
        EventBus.trigger('routeChange', '#active_page');
    }
});

window.addEventListener('hashchange', function() {
	Router.routing();
});