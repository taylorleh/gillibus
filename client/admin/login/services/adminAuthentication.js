/**
 * Created by taylor on 3/18/17.
 */

import angular from 'npm/angular';
let moduleName = 'gillibus.admin.service.adminAuthentication';

function AdminAuthentication() {
  let service = {};
  let _authed = false;


  service.setIsAuthorized = (hasAuth) => {
    _authed = hasAuth;
  };


  service.getAuthorization = () => {
    return _authed;
  };

  return service;
}


AdminAuthentication.$inject = [];

angular.module(moduleName, []).factory('AdminAuthentication', AdminAuthentication);

export default moduleName



