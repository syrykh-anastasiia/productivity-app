window.initLogin = function() {
	let loginView = new LoginView();
	let loginController = new LoginController(loginView);

	EventBus.on('renderLogin', function() {
		loginView.render();
	});

    EventBus.on('loginRendered', function() {
        var loginForm = document.getElementsByClassName('login-form')[0];

        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let inputUser = document.querySelector('input[name="username"]').value;
            let inputPass = document.querySelector('input[name="password"]').value;
            let validation = false;
            if(inputUser.length > 0 && inputPass.length > 0) validation = window.auth(inputUser, inputPass);
            if(validation) {
                LocalStorageData.setToLS('username', inputUser);
                EventBus.trigger('afterLogin');
                loginView.destroy();
            } else {
                document.getElementById('login').value = '';
                document.getElementById('pass').value = '';
            }
        });
    });
};
