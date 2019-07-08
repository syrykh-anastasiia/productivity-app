class TimerView {
	constructor() {
		this.template = Handlebars.compile($('#timerTemplate').html());;
	}
	render() {
		document.title = 'Timer';
		document.body.innerHTML = this.template;
	}
}