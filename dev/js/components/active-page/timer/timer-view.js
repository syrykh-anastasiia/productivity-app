class TimerView {
	constructor(template) {
		this.template = template;
	}
	render() {
		document.title = 'Timer';
		document.body.innerHTML = this.template;
	}
}