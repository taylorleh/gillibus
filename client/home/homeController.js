angular.module('gillibus.home', [])
.controller('HomeController',
  ['$scope', 'mapConfig', 'uiGmapGoogleMapApi', '$geolocation','DirectionService','uiGmapIsReady', function($scope,mapConfig, uiGmapGoogleMapApi, $geolocation, DirectionService, uiGmapIsReady) {

  const SF_PICKUP= {
    LNG:-122.419705,
    LAT: 37.765058
  };
  let MAP_INSTANCE;
  $scope.timer = null;



  /**
   * Resolve block
   *
   * @param {Object} userCoords
   * @param {Array} instance
   *
   * */
  $scope.getTimeToDestination = function(userCoords, instance) {
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
        lat: SF_PICKUP.LAT,
        lng: SF_PICKUP.LNG
      }
    };

    directionsService.route(directionsReq, function(res, status) {
      console.log('directions arrived ',arguments);
      directionsDisplay.setDirections(res);
      $scope.initTimer(res.routes.pop());
    });

  };

  $scope.initTimer = function(route) {
    let leg = route.legs[0];
    console.log('leg', leg);
    $scope.timer = {
      time: leg.duration.text,
      destination: leg.end_address,
      distance: leg.distance.text
    }
  };

  $scope.map = mapConfig;

  let init = function() {
    Promise.all([uiGmapIsReady.promise(1),$geolocation.getCurrentPosition({timeout: 10000}), uiGmapGoogleMapApi])
      .then(function(results) {
        let map = results[0][0];
        let currentPosition = results[1].coords;
        MAP_INSTANCE = map;
        $scope.getTimeToDestination(currentPosition, map.map);
      }, function(err) {
        console.warn('error resolving services', err);
      });
  };


  init();

}]);

