/**
* @constructor
* @param template
* @name LoginView
* @summary Login views
*/
/*import Handlebars from '../../libs/handlebars-v4.0.5.js';*/

class LoginView {
	constructor(template) {
		this.template = template;
	}
/**
* @memberof LoginView
* @summary render function
*/
	render() {
		let hTemplate = Handlebars.compile(this.template);
		let data = hTemplate();
		document.body.innerHTML = data;
		document.title = 'Log In';
	}
}