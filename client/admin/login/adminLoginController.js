/**
 * Created by taylor on 3/18/17.
 */

import angular from 'npm/angular';
let moduleName = 'gillibus.admin.controller.adminController';

class AdminController {

  constructor($scope, $state, $rootScope, $window, AdminAuth, AUTH_EVENTS) {
    angular.element('nav').hide();

    this.AUTH_EVENTS = AUTH_EVENTS;
    this.$window = $window;
    this.AdminAuth = AdminAuth;
    this.$state = $state;
    this.$rootScope = $rootScope;

    $scope.userName = '';
    $scope.password = '';
    $scope.login = {
      user: '',
      password: ''
    };
    $scope.onRequestLogin = this.onRequestLogin;


    $scope.$on('$destroy', () => {
      angular.element('nav').show();
    });
  }

  onRequestLogin(formData) {
    this.AdminAuth.signin(formData)
      .then(function (token) {
        this.$rootScope.$broadcast(this.AUTH_EVENTS.loginSuccess);
        this.$rootScope.setCurrentUser(token);
        this.$window.localStorage.setItem('com.gillibus', token);
        this.$state.go('portal.overview');
      }.bind(this), () => {
        this.$rootScope.$broadcast(this.AUTH_EVENTS.loginFailed);
      });
  }

}

AdminController.$inject = ['$scope', '$state', '$rootScope', '$window', 'AdminAuth', 'AUTH_EVENTS'];
angular.module(moduleName, []).controller('AdminController', AdminController);

export default moduleName
