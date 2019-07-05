class Router {
	static routing(location) {
		let currentLocation = location || window.location.hash.substr(1);
		EventBus.trigger('getRemoteFBData');
		switch(currentLocation) {
			case 'login':
				window.initLogin();
				EventBus.trigger('renderLogin');
			break;
			case 'settings':
				window.initSettings();
				//EventBus.trigger('renderSettings');				
			break;
			case 'active_page':
				window.initActivePage();
				//EventBus.trigger('renderActivePage');	
			break;
		}
	}
}

window.addEventListener('load', function() {
	$('body').addClass('loaded');

	let currentHash = location.hash;
	if(currentHash.length === 0 || currentHash === '#') {
		location.hash = '#login';
	} else {
		Router.routing(location.hash.substr(1));
	}

});

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
window.addEventListener('hashchange', function() {
	Router.routing();
});