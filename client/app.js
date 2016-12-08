angular.module('gillibus', [
  'gillibus.charter',
  'gillibus.locations',
  'gillibus.pricing',
  'gillibus.home',
  'gillibus.routes',
  'ui.bootstrap',
  'angularMoment',
  'slickCarousel',
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
    .when('/charter', {
      templateUrl: 'charter/charterTemplate.html',
      controller: 'CharterController'
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
