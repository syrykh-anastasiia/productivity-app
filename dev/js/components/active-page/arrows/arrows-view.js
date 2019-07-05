function ArrowsView(template) {
	this.template = Handlebars.compile(template);
}
ArrowsView.prototype.render = function() {
	var hTemplate = this.template;
	document.querySelector('.content-area').innerHTML += hTemplate();
}