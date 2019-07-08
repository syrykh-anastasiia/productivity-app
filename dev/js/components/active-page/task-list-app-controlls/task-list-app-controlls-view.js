 class TaskListAppControllsView {
	constructor() {
		this.template = Handlebars.compile($('#taskListAppControlsTemplate').html());;
	}
	render() {
		var controllsWrapper = document.querySelector('.app-settings');
		controllsWrapper.insertAdjacentHTML('afterbegin', this.template);
	}
}