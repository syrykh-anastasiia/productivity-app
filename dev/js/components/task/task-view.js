class TaskView {
	constructor(template) {
		this.template = Handlebars.compile(template);
	}
	render(task, key) {
		var hTemplate = this.template();
		var data = hTemplate({
								task: {
									category: task.category[0],
									deadline: task.deadline,
									title: task.title,
									description: task.description,
									priority: task.priority.toLowerCase(),
									estimation: task.estimation
								},
								taskKey: key});
		var categoryWrapper = document.getElementsByClassName('category-' + task.category[0] + '-wrapper')[0];
		if(categoryWrapper) {
			categoryWrapper.innerHTML += data;
		} else {
			var newCategory = document.createElement('div');
			var categoryIcon = '<div class="radio-icon icon-{{taskCategoryIndex}}"></div>' +
			'<h3 class="list-type-title category-{{taskCategoryIndex}}">{{taskCategoryName}}</h3>' +
								'<div class="double-span category-{{taskCategoryIndex}}"></div>';
			newCategory.className = 'category-' + task.category[0] + '-wrapper category-wrapper';

			var hCategoryIconTemplate = Handlebars.compile(categoryIcon);
			var categoryData = hCategoryIconTemplate({taskCategoryIndex: task.category[0], taskCategoryName: task.category[1]});

			newCategory.innerHTML = categoryData;
			newCategory.innerHTML += data;
			document.querySelector('.global-task-list').appendChild(newCategory);
		}
		document.querySelector('.btn-groups').classList.remove('hidden');
	}
	removeFromPage() {
		
	}
} 