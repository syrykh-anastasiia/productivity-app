export default class TaskTemplate {
	constructor() {
		this.template = '<section class="tasks-categories">' +
							    '<div class="span category-{{task.category}}"></div>' +
							    	'<div class="task-block block-border category-{{task.category}}" data-key="{{taskKey}}">' +
											'<button class="hidden add-to-trash category-{{task.category}}">' +
												'<i class="icon-trash removeItem"></i>' +
											'</button>' +
											'<p class="task-deadline">{{task.deadline}}</p>' +
											'<div class="task-description-wrapper">' +
												'<h4 class="task-name category-{{task.category}}">{{task.title}}</h4>' +
												'<p class="task-desciption">{{task.description}}</p>' +
											'</div>' +
											'<button class="open-timer pomodoro-priority priority-{{task.priority}}"><i class="icon-toggle"></i><span class="priority-num">{{task.estimation}}</span></button>' +
											'<div class="task-edits">' +
													'<button class="arrow-to-top edit-btn"><i class="icon-arrows-up"></i></button>' +
													'<button id="editBtn" class="open-modal-btn edit-btn"><i class="icon-edit"></i></button>' +
												'</div>' +
								'</div>' +
					'</section>';
	}
	show() {
		return this.template;
	}
}