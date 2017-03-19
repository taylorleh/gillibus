/**
 * Created by taylor on 3/18/17.
 */
import angular from 'npm/angular';
let moduleName = 'gillibus.admin.factory.authService';
let development = true;

const mockCredentials = {
  users: ['demouser1@gillibus.com', 'demouser2@gillibus.com', 'demouser3@gillibus.com'],
  password: 'password1'
};

const mockLogin = function(data) {
  if(mockCredentials.users.indexOf(data.user) !== -1 && data.password === mockCredentials.password) {

  } else {

  }

};


function AuthService() {

  let service = {};

  service.login = (data) => {
    // TODO - this needs to be removed soon
    if(development) {
      return Promise.resolve({code: 200})
    }
  };

  return service;
}


AuthService.$inject = ['$http'];

angular.module(moduleName, []).factory('AuthService', AuthService);

export default moduleName


