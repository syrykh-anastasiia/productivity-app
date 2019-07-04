export default class TimerTemplate {
	constructor() {
		this.template = '<section class="content-area">' +
		'<header>' +
			'<h1 class="main-page-title">1. Creating a New Design</h1>' +
			'<h3 class="small-title-hint">Lorem ipsum dolor sit amet consectetur adipiscing</h3>' +
		'</header>' +
		'<div class="timer-area">' +
			'<ul class="pomodoros">' +
				'<li class="pomodoro-item">' +
					'<img src="img/tomato.svg" alt="tomato">' +
				'</li>' +
				'<li class="pomodoro-item">' +
					'<img src="img/tomato.svg" alt="tomato">' +
				'</li>' +
				'<li class="pomodoro-item">' +
					'<img src="img/tomato.svg" alt="tomato">' +
				'</li>' +
			'</ul>' +
			'<div class="timer-container border-' + '">' +
				'<div class="timer-out">' +
					'<div class="spin timer"></div>' +
					'<div class="addition-spin timer"></div>' +
					'<div class="mask"></div>' +
				'</div>' +
				'<div class="timer-in">' +
					'<p class="timer-text">Let\'s do it</p>' +
					'<p class="hidden timer-text double-line"><span>6</span><br> min</p>' +
					'<p class="hidden timer-text">Break<br> is over</p>' +
					'<p class="hidden timer-text triple-line">Break<br><span>3</span><br>min</p>' +
					'<p class="hidden timer-text trile-text">You Completed Task</p>' +
				'</div>' +
			'</div>' +
		'</div>' +
		'<div class="hidden btn-group">' +
			'<button class="action-btn fail-btn">Fail Pomodora</button>' +
			'<button class="action-btn finish-btn">Finish Pomodora</button>' +
		'</div>' +
		'<div class="hidden btn-group">' +
			'<button class="action-btn start-btn">Start Pomodora</button>' +
			'<button class="hidden action-btn finish-task-btn">Finish Task</button>' +
		'</div>' +
		'<button class="action-btn start-btn">Start</button>' +
	'</section>';
	}
	show() {
		return this.template;
	}
}