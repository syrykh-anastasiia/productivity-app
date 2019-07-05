/*import AppControllsTemplate from './app-controlls-template.js';
import AppControllsView from './app-controlls-view.js';
import AppControllsController from './app-controlls-controller.js';*/

window.initAppControlls = function() {
	var appControllsTemplate = new AppControllsTemplate;
	var appControllsView = new AppControllsView(appControllsTemplate.show());
	var appControllsController = new AppControllsController(appControllsView);
}