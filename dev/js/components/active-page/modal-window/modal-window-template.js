export default class ModalWindowTemplate {
	constructor() {
		this.template = '<div id="modalWindow" class="modal modal-open hidden">' +
		'<div class="cover-wrapper"></div>' +
		'<div class="modal-window">' +
			'<div class="btns-group">' +
				'<button class="modal-action-btn"><i id="cancelAdding" class="icon-close"></i></button>' +
				'<button class="modal-action-btn"><i id="confirmAdding" class="{{mode}} icon-check"></i></button>' +
			'</div>' +
			'<div class="add-edit-task">' +
				'<h2 class="modal-title add-task-window">{{mode}} Task</h2>' +
				'<form class="modal-form">' +
					'<label for="title" class="input-title">TITLE</label>' +
					'<input id="title" type="text" class="input-content" placeholder="Add title here">' +
					'<label for="description" class="input-title">DESCRIPTION</label>' +
					'<input id="description" type="text" class="input-content" placeholder="Add description here">' +
					'<label for="category" class="input-title">CATEGORY</label>' +
					'<ul id="category" class="category-block input-content">' +
						'<li class="category-item">' +
							'<input id="input-work" class="list-item radio-list-item category-list" type="radio" name="category" checked><label for="input-work" class="c-radio-icon work"></label><span class="input-text">{{category0}}</span>' +
						'</li>' +
						'<li class="category-item">' +
							'<input id="input-educat" class="list-item radio-list-item category-list" type="radio" name="category"><label for="input-educat" class="c-radio-icon education"></label><span class="input-text">{{category1}}</span>' +
						'</li>' +
						'<li class="category-item">' +
							'<input id="input-hobby" class="list-item radio-list-item category-list" type="radio" name="category"><label for="input-hobby" class="c-radio-icon hobby"></label><span class="input-text">{{category2}}</span>' +
						'</li>' +
						'<li class="category-item">' +
							'<input id="input-sport" class="list-item radio-list-item category-list" type="radio" name="category"><label for="input-sport" class="c-radio-icon sport"></label><span class="input-text">{{category3}}</span>' +
						'</li>' +
						'<li class="category-item">' +
							'<input id="input-other" class="list-item radio-list-item category-list" type="radio" name="category"><label for="input-other" class="c-radio-icon other"></label><span class="input-text">{{category4}}</span>' +
						'</li>' +
					'</ul>' +
					'<label for="deadline" class="input-title">DEADLINE</label>' +
					'<input id="deadline" type="text" class="input-content" value="" placeholder="Pick a date">' +
					'<label for="estimation" class="input-title">ESTIMATION</label>' +
					'<ul id="estimation" class="estimation-block input-content">' +
						'<li class="estimation-item">' +
							'<input id="input-1-pomodoro" class="list-item checkbox-list-item estimation-list" type="checkbox"><label for="input-1-pomodoro" class="checkbox-element"></label>' +
						'</li>' +
						'<li class="estimation-item">' +
							'<input id="input-2-pomodoro" class="list-item checkbox-list-item estimation-list" type="checkbox"><label for="input-2-pomodoro" class="checkbox-element"></label>' +
						'</li>' +
						'<li class="estimation-item">' +
							'<input id="input-3-pomodoro" class="list-item checkbox-list-item estimation-list" type="checkbox"><label for="input-3-pomodoro" class="checkbox-element"></label>' +
						'</li>' +
						'<li class="estimation-item">' +
							'<input id="input-4-pomodoro" class="list-item checkbox-list-item estimation-list"  type="checkbox"><label for="input-4-pomodoro" class="checkbox-element"></label>' +
						'</li>' +
						'<li class="estimation-item">' +
							'<input id="input-5-pomodoro" class="list-item checkbox-list-item estimation-list"  type="checkbox"><label for="input-5-pomodoro" class="checkbox-element"></label>' +
						'</li>' +
					'</ul>' +
					'<label for="priority" class="input-title">PRIORITY</label>' +
					'<ul id="priority" class="priority-block input-content">' +
						'<li class="priority-item">' +
							'<input id="input-urgent" class="list-item radio-list-item priority-list" type="radio" name="priority" checked><label for="input-urgent" class="p-radio-icon urgent"></label><span class="input-text priority-value">Urgent</span>' +
						'</li>' +
						'<li class="priority-item">' +
							'<input id="input-high" class="list-item radio-list-item priority-list" type="radio" name="priority"><label for="input-high" class="p-radio-icon high"></label><span class="input-text priority-value">High</span>' +
						'</li>' +
						'<li class="priority-item">' +
							'<input id="input-middle" class="list-item radio-list-item priority-list" type="radio" name="priority"><label for="input-middle" class="p-radio-icon middle"></label><span class="input-text priority-value">Middle</span>' +
						'</li>' +
						'<li class="priority-item">' +
							'<input id="input-low" class="list-item radio-list-item priority-list" type="radio" name="priority"><label for="input-low" class="p-radio-icon low"></label><span class="input-text priority-value">Low</span>' +
						'</li>' +
					'</ul>' +
				'</form>' +	
			'</div>' +
		'</div>' +
	'</div>';
	}
	show() {
		return this.template;
	}
  
}