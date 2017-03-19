/**
 * Created by taylor on 3/18/17.
 */

import angular from 'npm/angular';
let moduleName = 'gillibus.admin.controller.adminPortalController';

class PortalController {

  //noinspection SpellCheckingInspection
  constructor($scope, $geolocation, gpsSocketFactory, busProperties) {
    // this.$scope = $scope;
    angular.element('nav').hide();

    $scope.buses = busProperties.busNames;
    $scope.driverBus = null;
    $scope.pollDataFromUser = this.pollDataFromUser.bind(this);
    $scope.onChooseDriverBus = this.onChooseDriverBus.bind($scope);
    $scope.data = {
      isPolling: false,
      myPosition: {
        coords: {}
      }
    };

    this.$geolocation = $geolocation;
    this.socket = gpsSocketFactory.connectWithNameSpace(io('/driver'));

    $scope.$on('$geolocation.position.changed', (event, newPosition) => {
      $scope.data.myPosition.coords = newPosition.coords;
      if(this.socket) {
        this.emitGpsDataToServer(this.socket, newPosition.coords);
      }
    });

    $scope.$on('$destroy', () => {
      this.socket.disconnect();
      this.$geolocation.clearWatch();
      angular.element('nav').show();
    });

  }




  emitGpsDataToServer(gpsSocket, coordinates) {
    gpsSocket.emit('driver location', {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      accuracy: coordinates.accuracy,
      heading:coordinates.heading
    });

  }

  onChooseDriverBus(name) {
    this.data.isPolling = true;
    this.pollDataFromUser({
      timeout: 30000,
      maximumAge: 250,
      enableHighAccuracy: true
    });

  }




  /**
   * Invokes the window navigator's watchPosition method
   *
   * @method pollDataFromUser
   * @param {{timeout: Number, maximumAge: Number, enableHighAccuracy: Boolean}} options - an options object
   * @returns None
   *
   */
  pollDataFromUser(options) {
    this.$geolocation.watchPosition(options);
  }

}

PortalController.$inject = ['$scope', '$geolocation', 'gpsSocketFactory', 'busProperties'];
angular.module(moduleName, []).controller('PortalController', PortalController);

export default moduleName

