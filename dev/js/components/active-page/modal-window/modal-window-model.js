export default class ModalWindowModel {
	constructor() {

	}
	getChosenTaskData(id) {
		var obj = {};
		var result = {};
		obj = JSON.parse(LocalStorageData.getFromLS('TaskList'));

		for(var i in obj) {
			if(id == i) {
				result = obj[i];
			}
		}
		
		return result;
	}
}