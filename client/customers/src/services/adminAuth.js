/**
 * Created by taylor on 3/23/17.
 *
 * This module handles the REST services for all admin actions. Admin sessions
 * are managed by this service.
 *
 */

import angular from 'npm/angular';
let moduleName = 'gillibus.factory.adminAuth';


function AdminAuth($http, $location, $window, adminSession) {
  let service = {};

  service.signin = (user) => {
    adminSession.destroy();
    return $http({
      method: 'POST',
      url: '/api/v1/admin/login',
      data: user
    })
    .then(function(resp) {
      let data = resp.data;
      adminSession.create(data.token, data.id, data.roles);
      return resp;
    });
  };


  service.signout = () => {
    $window.localStorage.removeItem('com.gillibus');
    $location.path('/admin');
  };

  service.isAuthorized = (authorizedRoles) => {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    let isAuthenticaed = service.isAuthenticated();
    let hasPermission = authorizedRoles.indexOf(adminSession.userRole);
    return isAuthenticaed && (hasPermission !== -1);
  };

  service.isAuthenticated = () => {
    return !!adminSession.userId;
  };

  return service;

}
AdminAuth.$inject = ['$http', "$location", "$window", "adminSession"];

angular.module(moduleName, []).factory('AdminAuth', AdminAuth);
export default moduleName;
