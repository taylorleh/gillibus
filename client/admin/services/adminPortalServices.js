/**
 * Created by taylor on 4/25/17.
 */

let moduleName = 'gillibus.service.adminPortalService';

function AdminPortalService($http) {

  let service = {};
  let urls = {
    users: '/api/v1/admin/users'
  };

  service.getAdminUsers = () => {
    return $http({
      method: 'POST',
      url: urls.users
    })
    .then(function(res) {
      return res;
    })
  };


  return service;

}
AdminPortalService.$inject = ['$http'];

angular.module(moduleName, []).factory('adminPortalService', AdminPortalService);
export default moduleName;
