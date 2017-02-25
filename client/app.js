import 'jquery';
import 'moment';

import angular from 'angular';
import 'npm/angular-ui-calendar/src/calendar.js'
import 'npm/fullcalendar/dist/fullcalendar.js';
import 'npm/fullcalendar/dist/gcal.js';

import { default as CharterController } from './charter/charterController';
import { default as LocationsController } from './locations/locationsController';

import { default as PricingController } from './pricing/pricingController';
import { default as HomeController } from './home/homeController';
import { default as RoutesController } from './routes/routesController';
import { default as ViewportDirective } from './directives/viewport';
import { default as FocusDirective } from './directives/focus';
import { default as CountdownDirective } from './directives/countdownSubheader';
import { default as ViewportService } from './services/viewport';
import { default as CalendarService } from './services/calendar';
import { default as DirectionsService } from './services/directions';
import { default as MapConstant } from './constant/map';


import 'ngGeolocation/ngGeolocation';
import 'angular-moment/angular-moment.js'
import ngRoute from 'npm/angular-route';
// import 'npm/angular-ui-bootstrap'

import 'angular-google-maps/dist/angular-google-maps';
import nemLogging from 'npm/angular-simple-logger/dist/index'

let moduleName = 'gillibus';





function config($routeProvider, uiGmapGoogleMapApiProvider, $locationProvider) {
  console.log('CONFIG WITH', uiGmapGoogleMapApiProvider)
  $routeProvider
    .when('/', {
      templateUrl: 'home/homeTemplate.html',
      controller: 'HomeController',
      controllerAs: 'tl'
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
      controller: 'CharterController',
      controllerAs: 'tl'
    })
    .otherwise('/');

  //  configure google maps provider
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyDs4rZOUR9C6GjW-FUifZ_kNZpnv9WjS6U&callback',
    v: '3', //defaults to latest 3.X anyhow
    libraries: 'geometry'
  });

  // $locationProvider.hashPrefix('');


}

config.$inject = ['$routeProvider', 'uiGmapGoogleMapApiProvider', '$locationProvider'];



angular.module(moduleName, [
  require('angular-route'),
  CharterController,
  // LocationsController.name,
  // PricingController.name,
  HomeController,
  // RoutesController.name,
  // ViewportDirective.name,
  // FocusDirective.name,
  CountdownDirective,
  // ViewportService.name,
  CalendarService,
  // DirectionsService.name,
  MapConstant,
  'ngGeolocation',
  // 'gapi',
  require('npm/angular-ui-bootstrap'),
  'ui.calendar',
  'angularMoment',
  // // 'credit-cards',
  // // 'slickCarousel',
  // nemLogging,
  'uiGmapgoogle-maps'
])
  .config(config);


export default moduleName
