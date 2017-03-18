import angular from 'npm/angular';
let moduleName = 'gillibus.home';


class HomeController {

  constructor($scope, mapConfig, $geolocation, uiGmapIsReady, uiGmapGoogleMapApi, gpsSocketFactory) {
    this.MOCKERROR = {
      error: {
        message: "Only secure origins are allowed (see: https://goo.gl/Y0ZkNV)."
      }
    };

    this.SF_PICKUP= {
      LNG:-122.419705,
      LAT: 37.765058
    };

    this.MAP_INSTANCE;
    this.uiGmapIsReady = uiGmapIsReady;
    this.$geolocation = $geolocation;
    this.uiGmapGoogleMapApi = uiGmapGoogleMapApi;
    this.$scope = $scope;
    this.map = mapConfig;
    this.gpsSocketFactory = gpsSocketFactory;

    this.init();

  }


  /**
   * Resolve block
   *
   * @param {Object} userCoords
   * @param {Array} instance
   *
   * */
  getTimeToDestination(userCoords, instance) {
    let directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(instance);

    let directionsService = new google.maps.DirectionsService();

    let directionsReq = {
      travelMode: 'WALKING',
      origin:{
        lat:userCoords.latitude,
        lng: userCoords.longitude
      },
      destination: {
        lat: this.SF_PICKUP.LAT,
        lng: this.SF_PICKUP.LNG
      }
    };

    directionsService.route(directionsReq, (res, status) => {
      directionsDisplay.setDirections(res);
      this.initTimer(res.routes.pop());
      this.timerError = false;
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
    this.$scope.$apply();
  }


  init() {
    Promise.all([this.uiGmapIsReady.promise(1), this.$geolocation.getCurrentPosition({timeout: 10000}), this.uiGmapGoogleMapApi])
      .then(function(results) {
        let map = results[0][0];
        let currentPosition = results[1].coords;
        this.MAP_INSTANCE = map;
        this.getTimeToDestination(currentPosition, map.map);
      }.bind(this));
  }
}

HomeController.$inject = ['$scope', 'mapConfig', '$geolocation', 'uiGmapIsReady', 'uiGmapGoogleMapApi', 'gpsSocketFactory'];
angular.module(moduleName, []).controller('HomeController', HomeController);

export default moduleName;

