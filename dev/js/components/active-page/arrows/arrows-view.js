function ArrowsView(template) {
	this.template = template;
}
ArrowsView.prototype.render = function() {
	var hTemplate = Handlebars.compile(this.template);
	var data = hTemplate();
	document.querySelector('.content-area').innerHTML += data;
}