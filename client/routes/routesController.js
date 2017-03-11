import angular from 'npm/angular';
let moduleName = 'gillibus.routes';

class RoutesController {
  constructor($scope, uiGmapGoogleMapApi, $geolocation) {

    this.init();
  }

  init(){
  }
}

angular.module(moduleName, []).controller('RoutesController', RoutesController);

export default moduleName;

