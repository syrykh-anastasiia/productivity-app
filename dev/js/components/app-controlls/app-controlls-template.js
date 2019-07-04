export default class AppControllsTemplate {
	constructor() {
		this.template = '<div class="app-settings">' +
			'<button class="setting-btn app-controll" id="goToReports">' +
				'<a class="tooltip" title="Go To Reports"><i class="icon-statistics setting-icons"></i></a>' +
			'</button>' +
			'<button class="setting-btn app-controll" id="settings">' +
				'<a class="tooltip" title="Go To Settings"><i class="icon-settings setting-icons"></i></a>' +
			'</button>' +
			'<button class="setting-btn app-controll" id="logout">' +
				'<a class="tooltip" title="Logout"><i class="icon-logout setting-icons"></i></a>' +
			'</button>' +
		'</div>';
	}
	show() {
		return this.template;
	}
 
}