import EventBus from './../../eventBus.js';
/**
* @constructor
* @param view
* @name LoginController
* @summary Login controller
*/
export default class LoginController {
	constructor(view) {
		if(LocalStorageData.getFromLS('username') !== null) {
			this.findNextPage();
		}
		this.view = view;
		let auth = window.auth;
		let self = this;
		document.addEventListener('submit', function(event) {
			event.preventDefault();
			let inputUser = document.getElementById('login').value;
			let inputPass = document.getElementById('pass').value;
			let validation = false;
			if(inputUser.length > 0 && inputPass.length > 0) validation = auth(inputUser, inputPass);
			document.getElementById('login').value = '';
			document.getElementById('pass').value = '';
			if(validation) {
				LocalStorageData.setToLS('username', inputUser);
				self.findNextPage();
			}
		});
	}
	findNextPage() {
		if(LocalStorageData.getFromLS('Pomodoros') === null && LocalStorageData.getFromLS('Categories') === null) {
			EventBus.trigger('routeChange', '#settings');
		} else {
			EventBus.trigger('routeChange', '#active_page');
		}
	}
} 