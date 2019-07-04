/**
* @constructor
* @name SettingsPomodorosTemplate
*/
export default class SettingsPomodorosTemplate {
	constructor() {
		this.template = '<div id="settings-pomodoros">' +
		'<div class="settings-pomodoros">' +
			'<section class="settings-items">' +
				'<div class="circle yellow"></div>' +
				'<h4 class="settings-items-title">WORK TIME</h4>' +
				'<div id="workTime" class="counter">' +
					'<button id="work-time-minus" class="minus icon"><i class="icon-minus"></i></button>' +
					'<input id="work-time-count" class="iterations" type="text" value="{{workTimeIterations}}" size="2" readonly> min' +
					'<button id="work-time-plus" class="plus icon"><i class="icon-add"></i></button>' +
				'</div>' +
				'<br><span>Lorem ipsum dolor sit amet consectetur adipiscing</span>' +
			'</section>' +
			'<section class="settings-items">' +
				'<div class="circle light-blue"></div>' +
				'<h4 class="settings-items-title">WORK ITERATION</h4>' +
				'<div id="workIteration" class="counter">' +
					'<button id="work-iteration-minus" class="minus icon"><i class="icon-minus"></i></button>' +
					'<input id="work-iteration-count" class="iterations" type="text" value="{{workIterations}}" size="2" readonly>' +
					'<button id="work-iteration-plus" class="plus icon"><i class="icon-add"></i></button>' +
				'</div>' +
				'<br><span>Lorem ipsum dolor sit amet consectetur</span>' +
			'</section>' +
			'<section class="settings-items">' +
				'<div class="circle blue"></div>' +
				'<h4 class="settings-items-title">SHORT BREAK</h4>' +
				'<div id="shortBreak" class="counter">' +
					'<button id="short-break-minus" class="minus icon"><i class="icon-minus"></i></button>' +
					'<input id="short-break-count" class="iterations" type="text" value="{{shortBreakIterations}}" size="2" readonly> min' +
					'<button id="short-break-plus" class="plus icon"><i class="icon-add"></i></button>' +
				'</div>' +
				'<br><span>Lorem ipsum dolor sit amet consectetur adipiscing sed do eiusmod tempor</span>' +
			'</section>' +
			'<section class="settings-items">' +
				'<div class="circle blue"></div>' +
				'<h4 class="settings-items-title">LONG BREAK</h4>' +
				'<div id="longBreak" class="counter">' +
					'<button id="long-break-minus" class="minus icon"><i class="icon-minus"></i></button>' +
					'<input id="long-break-count" class="iterations" type="text" size="2" value="{{longBreakIterations}}" readonly> min' +
					'<button id="long-break-plus" class="plus icon"><i class="icon-add"></i></button>' +
				'</div>' +
				'<br><span>Lorem ipsum dolor sit amet consectetur adipiscing</span>' +
			'</section>' +
		'</div>' +
		'<section class="your-cycle">' +
			'<h2 class="cycle-title">Your cycle</h2>' +
			'<p class="full-cycle-point">Full cycle: </p>' +
			'<ul class="timeline blue"></ul>' +
			'<ul class="timeline-scale"></ul>' +
		'</section>' +
		'<div class="btn-group">' +
			'<button id="nextToSetCat" class="action-btn next-btn">Next</button>' +
		'</div>'
		'</div>';
	}
/**
* @memberof SettingsPomodorosTemplate
* @summary show function
*/
	show(){
		return this.template;
	}
}
