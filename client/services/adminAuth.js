/**
 * Created by taylor on 3/23/17.
 */

import angular from 'npm/angular';
let moduleName = 'gillibus.factory.adminAuth';


function AdminAuth($http, $location, $window) {
  let service = {};

  service.signin = (user) => {
    return $http({
      method: 'POST',
      url: '/api/v1/admin/login',
      data: user
    })
      .then(function(resp) {
        return resp.data.token;
      });
  };

  service.signup = (user) => {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
      .then(function(resp) {
        return resp.data.token;
      });
  };

  service.isAuth = () => {
    return !!$window.localStorage.getItem('com.gillibus');
  };

  service.signout = () => {
    $window.localStorage.removeItem('com.gillibus');
    $location.path('/admin');
  };

  return service;

}


angular.module(moduleName, []).factory('AdminAuth', AdminAuth);
export default moduleName;
