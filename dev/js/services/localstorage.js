window.LocalStorageData = {
	setToLS: function(key, value) {
		localStorage.setItem(key, value);
		//EventBus.trigger('initData', [key, value]);
	},
	getFromLS: function(key) {
		return localStorage.getItem(key);
	},
	removeFromLS: function(key) {
		localStorage.removeItem(key);
	}
}

/*
class LocalStorageData {
    setToLS(key, value) {
        localStorage.setItem(key, value);
        //EventBus.trigger('initData', [key, value]);
	}

    getFromLS(key) {
        return localStorage.getItem(key);
	}

    removeFromLS(key) {
        localStorage.removeItem(key);
	}
}*/
