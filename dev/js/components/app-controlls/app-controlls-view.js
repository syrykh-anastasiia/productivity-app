class AppControllsView {
	constructor() {
		var self = this;
		this.template = Handlebars.compile($('#appControls').html());
	}
	render() {
		document.body.innerHTML = this.template();
	}
}