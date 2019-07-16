class ModalWindowView {
	constructor() {
		this.template = Handlebars.compile($('#modalTemplate').html());
	}
	render(mode) {
		var hTemplate = this.template;
		var data = hTemplate({category0: JSON.parse(LocalStorageData.getFromLS('Categories'))['0'][1],
													category1: JSON.parse(LocalStorageData.getFromLS('Categories'))['1'][1],
													category2: JSON.parse(LocalStorageData.getFromLS('Categories'))['2'][1],
													category3: JSON.parse(LocalStorageData.getFromLS('Categories'))['3'][1],
													category4: JSON.parse(LocalStorageData.getFromLS('Categories'))['4'][1],
													mode: mode});
		document.body.innerHTML += data;
        document.body.classList.add('modal-open');
        $( ".datepicker" ).datepicker({
			minDate: 0,
			maxDate: "+1Y"
        });
	}

	destroy() {
		//var modal = document.querySelector('.modal');
		//if(modal) document.body.removeChild(modal);
        document.body.classList.remove('modal-open');
	}
}

/*ModalWindowView.prototype.pomodorosCheckbox = function() {
	var modal = document.getElementsByClassName('modal-open')[0];
	var estimations = modal.querySelectorAll('.estimation-list');

	for(var i in estimations) {
	}
}*/