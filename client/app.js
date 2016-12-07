angular.module('gillibus', [
  'gillibus.locations',
  'gillibus.pricing',
  'gillibus.home',
  'gillibus.routes',
  'uiGmapgoogle-maps',
  'ngRoute'

]).config(function($routeProvider, uiGmapGoogleMapApiProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home/homeTemplate.html',
      controller: 'HomeController'
    })
    .when('/routes', {
      templateUrl: 'routes/routesTemplate.html',
      controller: 'RoutesController'
    })
    .when('/pricing', {
      templateUrl: 'pricing/pricingTemplate.html',
      controller: 'PricingController'
    })
    .when('/jose', {
      templateUrl: 'locations/locationsTemplate.html',
      controller: 'LocationsController'
    })
    .when('/jose', {
      templateUrl: 'locations/locationsTemplate.html',
      controller: 'LocationsController'
    })
    .when('/jose', {
      templateUrl: 'locations/locationsTemplate.html',
      controller: 'LocationsController'
    })
    .otherwise('/');

  //  configure google maps provider
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyDs4rZOUR9C6GjW-FUifZ_kNZpnv9WjS6U&callback',
    v: '3', //defaults to latest 3.X anyhow
    libraries: 'geometry'
  });

}).run(function($rootScope, $location) {
  console.log('RUNNING')

});
