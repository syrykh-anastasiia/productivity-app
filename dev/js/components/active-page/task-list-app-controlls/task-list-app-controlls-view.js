export default class TaskListAppControllsView {
	constructor(template) {
		this.template = template;
	}
	render() {
		var controllsWrapper = document.querySelector('.app-settings');
		controllsWrapper.insertAdjacentHTML('afterbegin', this.template);
	}
}