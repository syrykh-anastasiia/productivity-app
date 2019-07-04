/**
* @constructor
* @name ActivePageTemplate
*/
export default class ActivePageTemplate {
	constructor() {
		this.template = '<div class="content-area">' +
		'<header class="main-page-title">' +
			'<button id="addBtn" class="add-task-btn"><h1 class="add-task">Daily Task List +</h1></button>' +
		'</header>' +
		'<div class="title-to-task">' +
			'<p class="top-hint"><i class="icon-arrow_circle"></i><br>Add your first task</p>' +
		'</div>' +
		'<div class="today-task-list task-list">' +
		'</div>' +
			'<div class="hidden btn-groups">' +
				'<div class="global-group">' +
					'<button id="globalListToggle" class="global-list accordion-header">Global list<i class="accordion-icon icon-global-list-arrow-down"></i></button>' +
					'<div class="selection-type accordion-body">' +
						'<button class="priority-filter tabs active">All</button>' +
						'<button class="priority-filter tabs">Urgent</button>' +
						'<button class="priority-filter tabs">High</button>' +
						'<button class="priority-filter tabs">Middle</button>' +
						'<button class="priority-filter tabs">Low</button>' +
					'</div>' +
				'</div>' +
				/*'<div class="global-list-hide selection-group accordion-body">' +
					'<button class="tabs">Select All</button>' +
					'<button class="tabs">Deselect All</button>' +
				'</div>' +*/
			'</div>' +
			'<div class="global-list-hide global-task-list task-list accordion-body">' +
			'</div>' +	
		'</div>';
	}
/**
* @memberof ActivePageTemplate
*/
	show() {
		return this.template;
	}
  }