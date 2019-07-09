class LoginView {
	constructor() {
		this.template = Handlebars.compile($('#loginTemplate').html());
	}

	render() {
        let container = document.getElementById('main').querySelector('.container');
        container.innerHTML = this.template();
		document.title = 'Log In';
		document.body.classList.add('login-page');
		EventBus.trigger('loginRendered');
	}

	destroy() {
        document.body.classList.remove('login-page');
	}
}