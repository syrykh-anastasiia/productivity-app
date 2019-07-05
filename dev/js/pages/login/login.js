window.initLogin = function() {
	let loginView = new LoginView();
	let loginController = new LoginController(loginView);

	EventBus.on('renderLogin', function() {
		loginView.render();
	});
};
