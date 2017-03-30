/**
 * Created by taylor on 3/18/17.
 */

import angular from 'npm/angular';
let moduleName = 'gillibus.admin.controller.adminController';

class AdminController {

  constructor($scope, AuthService, $location, $rootScope, $window, AdminAuth) {
    angular.element('nav').hide();

    this.AuthService = AuthService;
    this.$window = $window;
    this.AdminAuth = AdminAuth;
    this.$location = $location;
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
    let auth = this.AdminAuth;

    this.AdminAuth.signin(formData)
      .then(function (token) {
        this.$window.localStorage.setItem('com.gillibus', token);
        this.$location.path('/admin/manage');
      }.bind(this))
      .catch(function (error) {
        console.error(error);
      });
    // this.AuthService.login(formData)
    //   .then(response => {
    //     this.$rootScope.$broadcast('admin:authorized');
    //     // this.$location.url('/admin/manage');
    //   })
    //   .catch(() => {
    //     this.$rootScope.$broadcast('admin:unauthorized');
    //   })
  }


}

AdminController.$inject = ['$scope', 'AuthService', '$location', '$rootScope', '$window', 'AdminAuth'];
angular.module(moduleName, []).controller('AdminController', AdminController);

export default moduleName

