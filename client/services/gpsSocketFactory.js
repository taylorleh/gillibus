/**
 * Created by taylor on 3/18/17.
 */

import angular from 'npm/angular';
let moduleName = 'gillibus.factory.gpsSocketFactory';


function gpsSocketFactory(socketFactory) {
  return socketFactory();
}



gpsSocketFactory.$inject = ['socketFactory'];

angular.module(moduleName, []).factory('gpsSocketFactory', gpsSocketFactory);
export default moduleName;
