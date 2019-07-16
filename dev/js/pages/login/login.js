window.initLogin = function() {
	let loginView = new LoginView();
	let loginController = new LoginController(loginView);

	EventBus.on('renderLogin', function() {
        loginView.render();
    });

    EventBus.on('loginRendered', function() {
        loginController.formValidation();
    });

    EventBus.on('loginDestroy', function() {
        loginView.destroy();
    });
};
