function CycleInput() {
	var self = this;
	this.settingsContainer = document.getElementsByClassName('settings')[0];
	this.controlElementContainers = document.getElementsByClassName('counter');
	this.controlValues = this.getValues();
	//this.controlValue = document.getElementsByClassName('iterations');

	this.settingsContainer.addEventListener('click', function() {
		var target = event.target;
		if(target.closest('.minus')) {
			self.valueDecrease(target);
		} else if(target.closest('.plus')) {
			self.valueIncrease(target);
		}
	});
}

CycleInput.prototype = {
	valueIncrease: function(target) {
		
	},
	valueDecrease: function(target) {

	},
	getValues: function() {
		var obj = {};
		var iterations = document.getElementsByClassName('iterations');
		for(var i = 0; i < this.controlElementContainers.length; i++) {
			obj[this.controlElementContainers[i].id] = iterations[i].value;
		}
		return obj;
	}
}