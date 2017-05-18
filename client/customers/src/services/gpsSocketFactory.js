/**
 * Created by taylor on 3/18/17.
 */

import angular from 'npm/angular';
let moduleName = 'gillibus.factory.gpsSocketFactory';


function gpsSocketFactory(socketFactory) {
  let service = {};

  service.connectWithNameSpace = function(ioSpace) {
    return socketFactory({
      ioSocket: ioSpace
    });
  };

  service.removeMyself = function(socket) {

  };

  return service;
}



gpsSocketFactory.$inject = ['socketFactory'];

angular.module(moduleName, []).factory('gpsSocketFactory', gpsSocketFactory);
export default moduleName;
