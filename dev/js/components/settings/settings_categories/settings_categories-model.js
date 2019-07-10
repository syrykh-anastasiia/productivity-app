class SettingsCategoriesModel {
	constructor() {
		//let self = this;
		
	}
	savingCategories(index, title) {
		let self = this;
		LocalStorageData.setToLS('Categories', self.parseLSData(index, title));
		EventBus.trigger('dataSet', 'Categories');
	}

	setDefaultData() {
		if(LocalStorageData.getFromLS('Categories') === null && location.hash == '#settings' ) {
			LocalStorageData.setToLS('Categories', JSON.stringify([[0, 'Work'], [1, 'Education'], [2, 'Hobby'], [3, 'Sport'], [4, 'Other']]));
			EventBus.trigger('dataSet', 'Categories');
		}
	}

	parseLSData(index, title) {
		let obj = {};
		obj = JSON.parse(LocalStorageData.getFromLS('Categories'));
		for(var i in obj) {
			if(obj[i][0] == index) {
				obj[i][1] = title;
			}
		}
		return JSON.stringify(obj);
	}

	saveData(id, value) {
		let self = this;
		LocalStorageData.setToLS('Categories', self.parseLSData(id, value));
	}
}