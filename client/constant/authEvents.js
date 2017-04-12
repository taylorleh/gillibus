/**
 * Created by taylor on 3/31/17.
 */


import angular from 'angular';
let moduleName = 'gillibus.constants.authEvents';

let AUTH_EVENTS = {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
};


angular.module(moduleName, []).constant('AUTH_EVENTS', AUTH_EVENTS);

export default moduleName;
