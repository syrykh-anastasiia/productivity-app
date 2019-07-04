export default {
	events: {},
	on: function(eventName, func) { //subscribe
		this.events[eventName] = this.events[eventName] || [];
		this.events[eventName].push(func);
	},
	off: function(eventName, func) { //unsubscribe
		if(this.events[eventName]) {
			for(var i = 0; i < this.events[eventName].length; i++) {
				if(this.events[eventName][i] === func) {
					this.events[eventName].splice(i, 1);
					break;
				}
			}
		}
	},
	trigger: function(eventName, data) { //throw event
		if(this.events[eventName]) {
			this.events[eventName].forEach(function(func) {
				func(data);
			});
		}
	}
};