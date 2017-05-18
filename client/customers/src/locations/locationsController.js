import angular from 'npm/angular';
export default angular.module('gillibus.locations', [])
  .controller('LocationsController',
    ['$scope', function($scope) {
    console.log('LOADED Locations CONTROLLER');
  }]);
