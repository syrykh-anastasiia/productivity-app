class TaskListAppControllsTemplate {
	constructor() {
		this.template = '<button class="setting-btn app-controll" id="addIcon">' +
  					'<a class="tooltip" title="Add New Task"><i class="icon-add setting-icons"></i></a>' + 
  				'</button>' +
      			'<button class="setting-btn app-controll" id="openTrash">' + 
      				'<a class="tooltip" title="Add To Trash"><i class="icon-trash setting-icons"></i><span class="hidden trash-count-mark"></span></a>' +
      			'</button>';
	}
	show() {
		return this.template;
	}
}