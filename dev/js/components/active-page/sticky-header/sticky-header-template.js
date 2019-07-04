export default class StickyHeaderTemplate {
	constructor() {
		this.template = '<div id="stickyHeader" class="hidden-header-wrapper hidden">' +
		'<header class="hidden-header">' +
			'<a href="/"><img class="hidden-header-logo" src="img/Logo.svg"></a>' +
			'<div class="nav-settings">' +
				'<button class="nav-settings-btn app-controll"><a class="tooltip" title="New Task"><i id="addIcon" class="icon-add setting-icons"></i></a></button>' +
				'<button class="nav-settings-btn app-controll"><a class="tooltip" title="To Trash"><i id="openTrash" class="icon-trash setting-icons"></i><span class="hidden trash-count-mark"></span></a></button>' +
				'<button class="nav-settings-btn app-controll"><a class="tooltip" title="To Reports"><i id="goToReports" class="icon-statistics setting-icons"></i></a></button>' +
				'<button class="nav-settings-btn app-controll"><a class="tooltip" title="To Settings"><i id="settings" class="icon-settings setting-icons current"></i></a></button>' +
				'<button class="nav-settings-btn app-controll"><a class="tooltip" title="Log out"><i id="logout2" class="icon-logout setting-icons"></i></a></button>' +
			'</div>' +
		'</header>' +
	'</div>';
	}
	show() {
		return this.template;
	}
}