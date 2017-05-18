import angular from 'npm/angular';
export default angular.module('gillibus.pricing', [])
  .controller('PricingController', ['$scope', function($scope) {
    console.log('LOADED Pricing CONTROLLER');
  }]);
