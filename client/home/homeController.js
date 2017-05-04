import angular from 'npm/angular';
let moduleName = 'gillibus.home';


class HomeController {

  constructor($scope, mapConfig, $geolocation, uiGmapIsReady, uiGmapGoogleMapApi, gpsSocketFactory, $q, $timeout) {

    this.SF_PICKUP = {
      LNG: -122.419705,
      LAT: 37.765058
    };

    this.$q = $q;
    this.MAP_INSTANCE;
    this.uiGmapIsReady = uiGmapIsReady;
    this.uiGmapGoogleMapApi = uiGmapGoogleMapApi;
    this.$timeout = $timeout;
    this.$scope = $scope;
    this.map = mapConfig;
    this.nobus = true;
    this.refresh = false;
    this.activeBuses = {};
    this.socket = gpsSocketFactory.connectWithNameSpace(io('/customer'));

    this.markers = {};
    this.markerCoords = {};
    this.markerId = Infinity;
    this.activeBusName = null;
    this.markerOptions = {
      GILLIBUS: 'assets/images/gillibus.png',
      STARSHIP: 'assets/images/starship.png',
      G3: 'assets/images/g3.png',
      CHARLIE: 'assets/images/charlie.png'
    };
    this.initSocketListeners(this.socket);


    $scope.$on('$destroy', function() {
      this.socket.disconnect();
    }.bind(this))


    this.uiGmapIsReady.promise(1)
      .then(instances => {
        // console.log('gmap instances ', instances);
      })

  }

  // ------------------------------------------------ ACTIONS ----------------------------------------------------------

  onClientBusSelect(busName) {
    this.activeBusName = busName;
    let busDetails = this.activeBuses[busName];
    if (busDetails) {
      this.setMarker(busDetails);
    } else {
      console.warn('client chose a bus to view but couldn\'t find in the model');
    }
  }


  // ------------------------------------------------ MAP ACTIONS -------------------------------------------

  /**
   * sets the marker properties on the model
   *
   * @param locationObj
   */
  setMarker(locationObj) {
    console.log('setting marker');

    let coord = {
      longitude: locationObj.location.longitude,
      latitude: locationObj.location.latitude
    };
    let bus = this.markers[locationObj.bus];
    if(bus) {
      bus.coords = coord;
    }
    else {
      this.markers[locationObj.bus] = {
        id: locationObj.bus,
        coords: coord,
        opts: { icon: this.markerOptions[locationObj.bus] }
      }
    }
  }


  refreshMap() {
    this.refresh = true;
    this.$timeout(() => {
      this.refresh = false;
    }, 1000)
  }


  /**
   * Resolve block
   *
   * @param {Object} userCoords
   * @param {Array} instance
   *
   * */
  // getTimeToDestination(userCoords, instance) {
  //   let directionsDisplay = new google.maps.DirectionsRenderer();
  //   directionsDisplay.setMap(instance);
  //
  //   let directionsService = new google.maps.DirectionsService();
  //
  //   let directionsReq = {
  //     travelMode: 'WALKING',
  //     origin: {
  //       lat: userCoords.location.latitude,
  //       lng: userCoords.location.longitude
  //     },
  //     destination: {
  //       lat: this.SF_PICKUP.LAT,
  //       lng: this.SF_PICKUP.LNG
  //     }
  //   };
  //
  //
  //   directionsService.route(directionsReq, (res, status) => {
  //     directionsDisplay.setDirections(res);
  //     this.initTimer(res.routes.pop());
  //     // this.timerError = false;
  //   });
  // }


  isDriverNew(locationObj) {
    return !(locationObj.bus in this.activeBuses);
  }

  initSocketListeners(socket) {
    socket.on('bus location', this.onBusLocation.bind(this));

    socket.on('no buses', () => {
      this.nobus = true;
    });


    socket.on('driver left', this.removeActiveDriver.bind(this));

    socket.on('connect', data => {
      this.requestOnlineBuses(socket);
    })

  }


  /**
   * request which buses are currently online at the moment
   *
   * @method requestOnlineBuses
   * @param socket - a client socket
   *
   */
  requestOnlineBuses(socket) {
    socket.emit('what buses are online', data => {
      console.log('CLIENT RECIEVED ONLINE BUSES', data);
      Object.keys(data).length && (this.nobus = false);
      this.updateBusSelectionWithCurrentlyOnlineBuses(data);
    });
  }

  /**
   * udates the model to reflect the current online buses. and creates a new directions
   * service if not already yet ceated
   *
   * @param {Object} busData
   */
  updateBusSelectionWithCurrentlyOnlineBuses(busData) {
    let allBusesToRender = [];
    if (Array.isArray(busData)) {
      busData.forEach(driver => {
        this.activeBuses[driver.bus] = driver;
        allBusesToRender.push(driver);
      })
    } else {
      this.activeBuses[busData.bus] = busData;
      allBusesToRender.push(busData);
    }

    allBusesToRender.forEach(this.setMarker.bind(this));
  }


  /**
   * removes a bus from the active list after driver disconnects
   * @param busName
   */
  removeActiveDriver(busName) {
    if(!busName) {
      console.error('NO BUS NAME RECIEVED');
      return;
    }

    if (!this.activeBuses[busName]) {
      console.warn('Busname not in active buses', this.activeBuses);
    } else if(!this.markers[busName]) {
      console.warn('tried removing bus but is not in model', this.markers);
    } else {
      delete this.activeBuses[busName];
      delete this.markers[busName];
    }
  }


  makeCoordsObject(locationObj) {
    return {
      longitude: locationObj.location.longitude,
      latitude: locationObj.location.latitude
    }
  }

  // ------------------------------------------ SOCKET HANDLERS ------------------------------------------

  /**
   * bus location handler. Adds the bus to the active buses hash and then adds a new marker or updates
   * the associated markers location
   *
   * @param data - bus data
   */
  onBusLocation(data) {
    this.activeBuses[data.bus] = data;
    this.setMarker(data);
    this.nobus = false;
  }




  createDirectionServiceForBus(busName) {

    let directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(instance);

    let directionsService = new google.maps.DirectionsService();

    let directionsReq = {
      travelMode: 'WALKING',
      origin: {
        lat: userCoords.location.latitude,
        lng: userCoords.location.longitude
      },
      destination: {
        lat: this.SF_PICKUP.LAT,
        lng: this.SF_PICKUP.LNG
      }
    };


    directionsService.route(directionsReq, (res, status) => {
      directionsDisplay.setDirections(res);
      this.initTimer(res.routes.pop());
    });


  }



  initTimer(route, hasError) {
    if (hasError) {
      hasError.error = true;
      this.timer = {
        message: hasError.message,
        error: true
      };
      this.$scope.$apply();
      return;
    }

    let leg = route.legs[0];
    this.timer = {
      error: false,
      time: leg.duration.text,
      destination: leg.end_address,
      distance: leg.distance.text
    };
  }


  init(socket) {
    this.initSocketListeners(socket);


    // Promise.all([this.uiGmapIsReady.promise(1), this.uiGmapGoogleMapApi])
    //   .then(function(results) {
    //     let map = results[0][0];
    //     // let currentPosition = results[1].coords;
    //     this.MAP_INSTANCE = map;
    //     // this.getTimeToDestination(currentPosition, map.map);
    //   }.bind(this));
  }
}

HomeController.$inject = ['$scope', 'mapConfig', '$geolocation', 'uiGmapIsReady', 'uiGmapGoogleMapApi',
  'gpsSocketFactory', '$q', '$timeout'];
angular.module(moduleName, []).controller('HomeController', HomeController);

export default moduleName;

