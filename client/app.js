angular.module('gillibus', [
  'gillibus.locations',
  'gillibus.pricing',
  'gillibus.home',
  'ngRoute'

]).config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'home/homeTemplate.html',
      controller: 'HomeController'
    })
    .when('/pricing', {
      templateUrl:'pricing/pricingTemplate.html',
      controller:'PricingController'
    })
    .when('/jose', {
      templateUrl:'locations/locationsTemplate.html',
      controller:'LocationsController'
    })
    .when('/jose', {
      templateUrl:'locations/locationsTemplate.html',
      controller:'LocationsController'
    })
    .when('/jose', {
      templateUrl:'locations/locationsTemplate.html',
      controller:'LocationsController'
    })
    .otherwise('/home')

}).run(function($rootScope, $location) {
  console.log('RUNNING')

});
