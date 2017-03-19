/**
 * Created by taylor on 3/18/17.
 */

import angular from 'npm/angular';
let moduleName = 'gillibus.admin.controller.adminController';

class AdminController {

  constructor($scope, AuthService, $location, $rootScope) {
    angular.element('nav').hide();

    this.AuthService = AuthService;
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
    this.AuthService.login(formData)
      .then(response => {
        this.$rootScope.$broadcast('admin:authorized');
        // this.$location.url('/admin/manage');
      })
      .catch(() => {
        this.$rootScope.$broadcast('admin:unauthorized');
      })
  }


}

AdminController.$inject = ['$scope', 'AuthService', '$location', '$rootScope'];
angular.module(moduleName, []).controller('AdminController', AdminController);

export default moduleName

