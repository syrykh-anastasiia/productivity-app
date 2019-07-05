/**
* @constructor
* @param template
* @name LoginView
* @summary Login views
*/

class LoginView {
	constructor() {
		this.template = Handlebars.compile($('#loginTemplate').html());
	}

	render() {
		document.body.innerHTML = this.template();
		document.title = 'Log In';
	}
}