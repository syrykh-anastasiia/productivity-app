class AppControllsView {
	constructor() {
		var self = this;
		this.template = Handlebars.compile($('#appControlsTemplate').html());
	}
	render() {
		document.body.innerHTML = this.template();
	}
}