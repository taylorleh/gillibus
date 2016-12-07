angular.module('gillibus.routes', [])
  .controller('RoutesController', ['$scope', 'uiGmapGoogleMapApi', function($scope, uiGmapGoogleMapApi) {

    $scope.map = {
      center: {
        latitude: 37.774929,
        longitude: -122.419416
      },
      zoom: 13
    };

    uiGmapGoogleMapApi.then(function(res) {
      console.log('loaded google api')
    })
  }]);
