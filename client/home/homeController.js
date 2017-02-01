angular.module('gillibus.home', [])
.controller('HomeController',
  ['$scope', 'uiGmapGoogleMapApi', '$geolocation','DirectionService','uiGmapIsReady', function($scope, uiGmapGoogleMapApi, $geolocation, DirectionService, uiGmapIsReady) {

  const SF_PICKUP= {
    LNG:-122.419705,
    LAT: 37.765058
  };
  let MAP_INSTANCE;



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
    });

  };

  $scope.map = {
    options: {
      clickableIcons:false,
      draggable:false,
      mapTypeControl:false,
      streetViewControl:false,
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    },
    center: {
      latitude: 37.774929,
      longitude: -122.419416
    },
    zoom: 13
  };


  let init = function() {
    Promise.all([uiGmapIsReady.promise(1),$geolocation.getCurrentPosition({timeout: 10000}), uiGmapGoogleMapApi])
      .then(function(results) {
        let map = results[0][0];
        let currentPosition = results[1].coords;
        MAP_INSTANCE = map;
        $scope.getTimeToDestination(currentPosition, map.map);

      });
  };


  init();

}]);

