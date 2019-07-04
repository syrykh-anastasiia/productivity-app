function AuthData() {
	var userName = 'admin';
	var pass = 'admin';

	return {
		getUser: function() {
			return userName;
		},
		getPass: function() {
			return pass;
		}
	}
}

window.auth = function(login, pass) {
	var result = false;
	var authData = new AuthData();
	if(login === authData.getUser() && pass === authData.getPass()) result = true;
	return result;
}