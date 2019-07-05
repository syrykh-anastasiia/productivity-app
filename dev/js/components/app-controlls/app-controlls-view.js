/*import Handlebars from '../../libs/handlebars-v4.0.5.js';*/

class AppControllsView {
	constructor(template) {
		this.template = template;
	}
	render() {
		var hTemplate = Handlebars.compile(this.template);
		var data = hTemplate();
		document.body.innerHTML = data;
	}
}