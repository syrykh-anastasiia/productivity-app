class LoginController {
	constructor(view) {
		this.view = view;
	}

	formValidation() {
        let loginForm = document.getElementsByClassName('login-form')[0];

        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            let inputUser = document.querySelector('input[name="username"]').value;
            let inputPass = document.querySelector('input[name="password"]').value;
            let validation = false;
            if(inputUser.length > 0 && inputPass.length > 0) validation = window.auth(inputUser, inputPass);
            if(validation) {
                LocalStorageData.setToLS('username', inputUser);
                EventBus.trigger('afterLogin');
                this.view.destroy();
            } else {
                document.querySelector('input[name="username"]').value = '';
                document.querySelector('input[name="password"]').value = '';
                this.classList.add('validation-error');
            }
        });
	}
}