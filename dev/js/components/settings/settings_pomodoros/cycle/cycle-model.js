//var inputChanges = '0'; 

function Inputs(options) {
	var elem = options.elem;
	var step = options.step; 
	var minValue = options.minValue;
	var maxValue = options.maxValue;
	var counter = elem.querySelector('.iterations');

	elem.addEventListener('click', function() {
		if(event.target.closest('.minus')) {
			valueDecrease();
		//	inputChanges = '1';
		} else if(event.target.closest('.plus')) {
			valueIncrease();
			//inputChanges = '1';
		}
		
	});

	function valueDecrease() {
		if(counter.value <= minValue) return;
		counter.value = parseInt(counter.value) - step;
	}
	function valueIncrease() {
		if(counter.value >= maxValue) return;
		counter.value = parseInt(counter.value) + step;
	}
}