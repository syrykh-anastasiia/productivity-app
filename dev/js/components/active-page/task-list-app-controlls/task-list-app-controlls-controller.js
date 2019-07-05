class TaskListAppControllsController {
	constructor(view) {
		this.view = view;
		window.initAppControlls();
		this.view.render();

		document.addEventListener('click', function(event) {
			if(event.target.closest('#openTrash')) {
				var trashes = document.getElementsByClassName('add-to-trash');
				for(var i = 0; i < trashes.length; i++) {
					if(trashes[i].classList.contains('hidden')) {
						trashes[i].classList.remove('hidden');
					}
					else trashes[i].classList.add('hidden');
				}
			}
		});
	}
	
}