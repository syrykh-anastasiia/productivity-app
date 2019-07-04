import EventBus from './../../../../eventBus.js';
export default function Timeline(options) {
	var elem = options.elems;
	var counter = options.valuesWrap;

	var repeats = options.repeats;
	render();
	countCyclePoints();
	/*window.addEventListener('load', function() {
		render();
		countCyclePoints();
	});*/
	window.addEventListener('click', function(event) {
		if(event.target.closest('.icon')){
			render();
			countCyclePoints();
			var changedElem = event.target.parentNode.parentNode;
			EventBus.trigger('settingInputsChanges', [changedElem.id, changedElem.querySelector('.iterations').value]);
		}
	});

	function render() { 
		if(repeats.value > 0) {
			resetTimeline('timeline');
			for(var i = 0; i < 2; i++) {
				for(var j = 0; j < repeats.value*2; j++) {
					var li = document.createElement('li');
					document.getElementsByClassName('timeline')[0].appendChild(li);
				}
			}
			fullCycle();
		}
	}

	function widthCount(i) { 
		var oneMinute = 100 / ((parseInt(counter[0].value) + parseInt(counter[1].value)) * repeats.value * 2 + parseInt(counter[2].value));
		return oneMinute * counter[i].value + '%';
	}

	function fullCycle() {
		var timelineItems = document.querySelector('.timeline').childNodes;
		for(var i = 0; i < timelineItems.length; i++) {
			if((i % 2) === 0) {
				timelineItems[i].className = 'work-time timeline-blocks yellow';
			} else if((i % 2) !== 0) {
				timelineItems[i].className = 'short-break timeline-blocks blue';
			}
		}
		var li = document.createElement('li');
		li.className = 'long-break timeline-blocks blue';
		var temp = document.querySelector('.timeline').childNodes;
		document.querySelector('.timeline').insertBefore(li, temp[((temp.length)/2)]);

		setWidth();
	}
	function setWidth() {
		for(var i = 0; i < elem.length; i++) {
			for(var j = 0; j < document.getElementsByClassName(elem[i]).length; j++) {
				document.getElementsByClassName(elem[i])[j].style.width = widthCount(i);
			}
		}
	}

	function resetTimeline(classRemoveName) { //sets empty timeline
		var timeline = document.querySelector('.' + classRemoveName);
		while(timeline.lastChild) timeline.removeChild(timeline.lastChild);
	}

	function countCyclePoints() {
		resetTimeline('timeline-scale');
		var oneMinute = 100 / ((parseInt(counter[0].value) + parseInt(counter[1].value)) * repeats.value * 2 + parseInt(counter[2].value));
		var totalMinutes = (parseInt(counter[0].value) + parseInt(counter[1].value)) * repeats.value * 2 + parseInt(counter[2].value);
		var totalPoints = Math.floor(totalMinutes / 30);
		for(var i = 0; i < totalPoints; i++) {
			var li = document.createElement('li');
			var text = document.createTextNode(pointInnerText(i));
			li.appendChild(text);
			li.className = 'hourPin';
			li.style.width = oneMinute * 30 + '%';
			document.querySelector('.timeline-scale').appendChild(li);
		}

		document.querySelector('.full-cycle-point').style.paddingLeft = (parseInt(document.querySelector('.work-time').style.width) + 
																					parseInt(document.querySelector('.short-break').style.width)) * repeats.value + 
																					parseInt(document.querySelector('.long-break').style.width) + '%';
		var text = document.createTextNode((parseInt(counter[0].value) + parseInt(counter[1].value)) * repeats.value + parseInt(counter[2].value));
		//document.getElementsByClassName('full-cycle-point')[0].appendChild(text);
	}
	function pointInnerText(i) {
		var totalMinutes = (parseInt(counter[0].value) + parseInt(counter[1].value)) * repeats.value * 2 + parseInt(counter[2].value);
		var text = [];
		for(var j = 0; j < totalMinutes; j += 30) {
			if(j === 30) text.push(j + 'min');
			else if(j >= 60) {
				if(j % 60 === 0) text.push(j / 60 + 'h');
				else if(j % 60 !== 0) text.push(parseInt(j / 60) + 'h ' + 30 + 'min');
			}
		}
		return text[i];
	}
} 
