function ReportsView() {
	TaskListAppControllsController();
	var template = ReportsTemplate();
	var hTemplate = Handlebars.compile(template);
	var data = hTemplate();
	document.body.innerHTML += data;
	
	ArrowsController();
	
	return this;
}