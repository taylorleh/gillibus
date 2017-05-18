/**
 * Created by taylor on 3/23/17.
 */

import angular from 'npm/angular';
let moduleName = 'gillibus.interceptors.attachToken';

function attachTokens($window) {
  let attach = {};
  attach.request = (object) => {
    let jwt = $window.localStorage.getItem('com.gillibus');
    if (jwt) {
      object.headers['x-access-token'] = jwt;
    }
    object.headers['Allow-Control-Allow-Origin'] = '*';
    return object;

  };
  return attach;
}
attachTokens.$inject = ['$window'];

angular.module(moduleName, []).factory('AttachTokens', attachTokens);
export default moduleName;
