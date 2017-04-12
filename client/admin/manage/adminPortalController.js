/**
 * Created by taylor on 3/18/17.
 */

import angular from 'npm/angular';
let moduleName = 'gillibus.admin.controller.adminPortalController';

class PortalController {

  //noinspection SpellCheckingInspection
  constructor($scope, $geolocation, gpsSocketFactory, busProperties, adminSession, $state) {
    angular.element('nav').hide();
    this.gpsSocketFactory = gpsSocketFactory;
    this.$geolocation = $geolocation;
    this.$scope = $scope;
    this.$state = $state;

    this.buses = busProperties.busNames;
    this.driverBus = null;
    this.data = {
      isPolling: false,
      myPosition: {
        coords: {}
      }
    };


    this.socket = this.startSocketConnection(this.gpsSocketFactory, adminSession.id);
    this.initSocketListeners(this.socket);


    this.$scope.$on('$geolocation.position.changed', (event, newPosition) => {
      this.data.myPosition.coords = newPosition.coords;
      if(this.socket) {
        this.emitGpsDataToServer(this.socket, newPosition.coords, this.driverBus);
      }
    });

    this.$scope.$on('$destroy', () => {
      this.socket.disconnect();
      this.$geolocation.clearWatch();
      angular.element('nav').show();
    });

  }


  /**
   * Emits a disconnection event to the server
   *
   * @param socket - a driver socket
   *
   */
  disconnectDriverSocket(socket) {
    socket.disconnect();
  }


  /**
   * Emits the driver current GPS coordinates to the server
   *
   * @param gpsSocket - a driver socket
   * @param coordinates - GPS coordinates object
   *
   */
  emitGpsDataToServer(gpsSocket, coordinates, bus) {
    gpsSocket.emit('driver location', {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      accuracy: coordinates.accuracy,
      heading:coordinates.heading,
      driverBus: bus
    });
  }


  /**
   * Sets up socket listeners for a given driver
   *
   * @param socket - a driver socket
   *
   */
  initSocketListeners(socket) {
    socket.on('connect', function(e) {
    });

    socket.on("unauthorized", error => {
      let type = error.data.name;
      if (type === "UnauthorizedError") {
        this.disconnectDriverSocket(socket);
        this.$state.transitionTo('main');
      } else if(type === "TokenExpiredError") {
        this.disconnectDriverSocket(socket);
        this.$state.transitionTo('admin');
      } else {
        this.$state.transitionTo('main');
      }
    });
  }


  /**
   * Initializes a new socket in the driver namespace
   *
   * @param socketFactory - the io
   * @param token - auth token
   *
   */
  startSocketConnection(socketFactory, token) {
    return socketFactory.connectWithNameSpace(io('/driver', {
      'query': `token=${token}`
    }));
  }


  /**
   * Event handler for choosing bus
   * @param name
   */
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

PortalController.$inject = ['$scope', '$geolocation', 'gpsSocketFactory', 'busProperties', 'adminSession', '$state'];
angular.module(moduleName, []).controller('PortalController', PortalController);

export default moduleName

