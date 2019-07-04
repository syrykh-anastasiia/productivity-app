/**
* @constructor
* @name LoginTemplate
* @summary Login template
*/
export default class LoginTemplate {
  constructor() {
    this.template = '<div class="main-wrapper">' +
      '<div class="login-content-area">' +
        '<h1 class="alt-logo-text">Pomodoro Login Page</h1>' +
        '<div class="logo"></div>' +
        '<form id="loginForm" class="log-in">' +
           '<label class="input-wrap">' +
             '<input id="login" class="form-input login-input" type="text" placeholder="Username" autocomplete="off"><i class="icon-login login"></i>' + 
           '</label>' +
           '<span class="hidden error-text">Lorem ipsum dolor sit amet, consectetu adipiscing elit</span>' +
           '<label class="input-wrap">' +
             '<input id="pass" class="form-input pass-input" type="password" placeholder="Password" autocomplete="off"><i class="icon-password password"></i>' +
          ' </label>' +
           '<input type="submit" value="Log In">' +
        '</form>' +
      '</div>' +
      '</div>';
  }
/**
* @memberof LoginTemplate
* @summary show function
*/
  show() {
    return this.template;
  }
}