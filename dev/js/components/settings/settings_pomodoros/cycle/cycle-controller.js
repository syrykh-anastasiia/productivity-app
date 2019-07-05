/*import Inputs from './cycle-model.js';
import Timeline from './cycle-view.js';*/

function CycleController() {
	var workTime = new Inputs({
		elem: document.getElementById('workTime'),
		step: 5,
		minValue: 15,
		maxValue: 40
	});
	var shortBreak = new Inputs({
		elem: document.getElementById('shortBreak'),
		step: 1,
		minValue: 1,
		maxValue: 15
	});

	var workIteration = new Inputs({
		elem: document.getElementById('workIteration'),
		step: 1,
		minValue: 1,
		maxValue: 5
	});

	var longBreak = new Inputs({
		elem: document.getElementById('longBreak'),
		step: 5,
		minValue: 30,
		maxValue: 60
	});


	var timeline = new Timeline({
		elems: [
			'work-time',
			'short-break',
			//'work-iteration',
			'long-break'
		],
		valuesWrap: [
			document.getElementById('work-time-count'),
			document.getElementById('short-break-count'),
			document.getElementById('long-break-count')
		],
		repeats: document.getElementById('work-iteration-count')
	});
}