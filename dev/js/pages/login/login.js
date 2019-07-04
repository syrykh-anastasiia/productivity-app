import EventBus from '../../eventBus.js';

import LoginTemplate from './login-template.js';
import LoginView from './login-view.js';
import LoginController from './login-controller.js';

window.initLogin = function() {
	let loginTemplate = new LoginTemplate;
	let loginView = new LoginView(loginTemplate.show());
	let loginController = new LoginController(loginView);

	EventBus.on('renderLogin', function() {
		loginView.render();
	});
};
