import 'jquery';
import 'lodash';
import 'moment';

import angular from 'npm/angular';
import 'npm/angular-ui-calendar/src/calendar.js'
import 'npm/fullcalendar/dist/fullcalendar.js';
import 'npm/fullcalendar/dist/gcal.js';

// CONTROLLERS
import { default as CharterController } from './charter/charterController';
import { default as LocationsController } from './locations/locationsController';
import { default as PricingController } from './pricing/pricingController';
import { default as HomeController } from './home/homeController';
import { default as RoutesController } from './routes/routesController';
import { default as AdminController } from './admin/login/adminLoginController';
import { default as AdminPortalController } from './admin/manage/adminPortalController';

// SERVICES
import { default as ViewportService } from './services/viewport';
import { default as CalendarService } from './services/calendarEventsService';
import { default as CharterBookingService } from './services/charterBooking';
import { default as CheckoutStateService } from './services/charterCheckoutStateService';
import { default as GpsSocketFactory } from './services/gpsSocketFactory';
import { default as AdminAuthService } from './admin/login/services/authService';
import { default as AdminAuthenticationService } from './admin/login/services/adminAuthentication';
import { default as DirectionsService } from './services/directions';

// DIRECTIVES
import { default as ViewportDirective } from './directives/viewport';
import { default as FocusDirective } from './directives/focus';
import { default as CountdownDirective } from './directives/countdownSubheader';
import { default as CardDirective } from './directives/cardValidation';

// CONSTANTS
import { default as MapConstant } from './constant/map';
import { default as CalendarConstant } from  './constant/calendarConfig';
import { default as BusPropsConstant } from './constant/busProperties';

// THIRDS PARTY
import 'npm/ngGeolocation/ngGeolocation';
import 'npm/angular-moment/angular-moment.js';
// import 'npm/angular-ui-bootstrap';
import 'bootstrap/dist/js/bootstrap';
import 'npm/angular-socket-io/socket.js';
import 'npm/bootstrap/less/bootstrap.less';
import io from '../node_modules/socket.io-client/dist/socket.io';
window.io = io;

import 'npm/fullcalendar/dist/fullcalendar.css';
import './assets/styles.css';


import 'npm/angular-google-maps/dist/angular-google-maps';
import nemLogging from 'npm/angular-simple-logger/dist/index'

let moduleName = 'gillibus';


function config($routeProvider, uiGmapGoogleMapApiProvider, $locationProvider) {
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
      controllerAs: 'vm'
    })
    .when('/admin', {
      templateUrl: 'admin/login/adminLoginTemplate.html',
      controller: 'AdminController',
      controllerAs: 'vm'
    })
    .when('/admin/manage', {
      templateUrl: 'admin/manage/adminPortalTemplate.html',
      controller: 'PortalController'
    })
    .otherwise('/');


  //  configure google maps provider
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyAirP89osWYJpZQPOuUrCeFaO2kF3NS9eA&callback',
    v: '3', //defaults to latest 3.X anyhow
    libraries: 'geometry'
  });

  $locationProvider.hashPrefix('');
}
config.$inject = ['$routeProvider', 'uiGmapGoogleMapApiProvider', '$locationProvider'];

function run($rootScope, $location, AdminAuthentication) {
  $rootScope.$on('admin:authorized', () => {
    AdminAuthentication.setIsAuthorized(true);
    $rootScope.$apply(function() {
      $location.url('/admin/manage');
    })
  });

  $rootScope.$on('admin:unauthorized', () => {
    AdminAuthentication.setIsAuthorized(false);
  });
}
run.$inject = ['$rootScope','$location', 'AdminAuthentication'];


angular.module(moduleName, [
    require('angular-route'),
    require('npm/angular-ui-bootstrap'),
    require('angular-animate'),
    CharterController,
    // LocationsController.name,
    // PricingController.name,
    HomeController,
    RoutesController,
    AdminController,
    AdminPortalController,
    CountdownDirective,
    CardDirective,
    ViewportService,
    CalendarService,
    CharterBookingService,
    CheckoutStateService,
    AdminAuthService,
    AdminAuthenticationService,
    GpsSocketFactory,
    // DirectionsService.name,
    MapConstant,
    CalendarConstant,
    BusPropsConstant,
    'ngGeolocation',
    // 'gapi',
    'ui.calendar',
    'angularMoment',
    'btford.socket-io',
    // // 'credit-cards',
    // // 'slickCarousel',
    // nemLogging,
    'uiGmapgoogle-maps'
  ])
  .config(config)
  .run(run);


export default moduleName
