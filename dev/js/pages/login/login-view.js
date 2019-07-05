/**
* @constructor
* @param template
* @name LoginView
* @summary Login views
*/

class LoginView {
	constructor(template) {
		this.template = Handlebars.compile(template);
	}
/**
* @memberof LoginView
* @summary render function
*/
	render() {
		let data = this.template();
		document.body.innerHTML = data;
		document.title = 'Log In';
	}
}