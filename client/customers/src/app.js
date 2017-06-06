import 'jquery';
import 'lodash';
import 'moment';

import angular from 'npm/angular';
import 'npm/angular-ui-calendar/src/calendar.js'
import 'npm/fullcalendar/dist/fullcalendar.js';
import 'npm/fullcalendar/dist/gcal.js';

// CONTROLLERS
import { default as AppController } from './main/mainCtrl';
import { default as CharterController } from './charter/charterController';
import { default as LocationsController } from './locations/locationsController';
import { default as PricingController } from './pricing/pricingController';
import { default as HomeController } from './home/homeController';
import { default as RoutesController } from './routes/routesController';
import { default as AdminController } from './admin/login/adminLoginController';
import { default as AdminPortalController } from './admin/manage/adminPortalController'; // original
// new with abstract
import { default as AdminBaseController } from './admin/adminCtrl';
import { default as AdminOverviewController } from './admin/overview/adminOverviewCtrl';
import { default as AdminUsersController } from './admin/users/adminUsersCtrl';

// SERVICES
import { default as ViewportService } from './services/viewport';
import { default as CalendarService } from './services/calendarEventsService';
import { default as CharterBookingService } from './services/charterBooking';
import { default as CheckoutStateService } from './services/charterCheckoutStateService';
import { default as GpsSocketFactory } from './services/gpsSocketFactory';
// import { default as AdminAuthService } from './admin/login/services/authService'; // this is mock do not use
// import { default as AdminAuthenticationService } from './admin/login/services/adminAuthentication'; // this is mock do not use
import { default as AdminAuth } from  './services/adminAuth';
import { default as AdminSessionService } from  './services/adminSession';
import { default as AdminPortalService } from './admin/services/adminPortalServices'; // services for users, buses, etc
import { default as DirectionsService } from './services/directions';


// var templateUrl = require('ngtemplate!html!./test.html');
// TEMPLATES
const mainTpl = require('./main/mainTpl.html');
const homeTemplate = require('./home/homeTemplate.html');
const routesTemplate = require('./routes/routesTemplate.html');
const pricingTemplate = require('./pricing/pricingTemplate.html');
const charterTemplate = require('./charter/charterTemplate.html');
const adminLoginTemplate = require('./admin/login/adminLoginTemplate.html');

// INTERCEPTORS
import { default as AttachTokensInterceptor } from './services/interceptors/attachTokens';

// DIRECTIVES
import { default as CountdownDirective } from './directives/countdownSubheader';
import { default as CardDirective } from './directives/cardValidation';

// CONSTANTS
import { default as MapConstant } from './constant/map';
import { default as CalendarConstant } from  './constant/calendarConfig';
import { default as BusPropsConstant } from './constant/busProperties';
import { default as UserRoles } from './constant/userRoles';
import { default as AuthEvents } from './constant/authEvents';

// THIRDS PARTY
import 'ngGeolocation/ngGeolocation';
import 'angular-moment/angular-moment.js';
import 'bootstrap/dist/js/bootstrap';
import 'angular-socket-io/socket.js';


// LOCAL STYLES


// STYLES
import 'bootstrap/less/bootstrap.less';
import 'font-awesome/less/font-awesome.less';
import 'fullcalendar/dist/fullcalendar.css';
import '../static/styles.css';

import io from '../../../node_modules/socket.io-client/dist/socket.io';
window.io = io;


import 'npm/angular-google-maps/dist/angular-google-maps';
import 'npm/angular-simple-logger/dist/index';

let moduleName = 'gillibus';


function config($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider, $locationProvider, $httpProvider, USER_ROLES) {

  $httpProvider.interceptors.push([
    '$injector',
    function($injector) {
      return $injector.get('AuthInterceptor');
    }
  ]);


  $stateProvider
    .state('main', {
      abstract: true,
      url: '/',
      // templateUrl: mainTpl,
      template: mainTpl,
      controller: 'AppController',
      controllerAs: 'tl',
      data: {}
    })
    .state('home', {
      parent: 'main',
      url: '',
      template: homeTemplate,
      controller: 'HomeController',
      controllerAs: 'tl',
      data: {}
    })
    .state('routes', {
      parent: 'main',
      url: 'routes',
      template: routesTemplate,
      controller: 'RoutesController',
      data: {}
    })
    .state('pricing', {
      parent: 'main',
      url: 'pricing',
      template: pricingTemplate,
      controller: 'PricingController',
      data: {}
    })
    .state('charter', {
      parent: 'main',
      url: 'charter',
      template: charterTemplate,
      controller: 'CharterController',
      controllerAs: 'vm',
      data: {}
    })
    .state('login', {
      url: '/admin',
      template: adminLoginTemplate,
      controller: 'AdminController',
      controllerAs: 'vm',
      data: {}
    });

  // ADMIN
  // $stateProvider
  //   .state('portal', {
  //     url: '/portal',
  //     // abstract: true,
  //     templateUrl: 'customers/src/admin/admin.html',
  //     controller: 'AdminBaseCtrl',
  //     data: {
  //       // authorizedRoles: [USER_ROLES.admin]
  //     }
  //   })
  //   .state('portal.overview', {
  //     parent: 'portal',
  //     url: '/overview',
  //     templateUrl: 'customers/src/admin/overview/adminOverviewTpl.html',
  //     controller: 'AdminOverviewCtrl',
  //     redirectTo: 'login',
  //     data: {
  //       authorizedRoles: [USER_ROLES.admin]
  //     }
  //   })
  //   .state('portal.buses', {
  //     parent: 'portal',
  //     url: '/buses',
  //     templateUrl: 'customers/src/admin/manage/adminPortalTemplate.html',
  //     controller: 'PortalController',
  //     controllerAs: 'vm',
  //     redirectTo: 'login',
  //     data: {
  //       authorizedRoles: [USER_ROLES.admin]
  //     }
  //   })
  //   .state('portal.users', {
  //     parent: 'portal',
  //     url: '/users',
  //     templateUrl: 'customers/src/admin/users/adminUsersTpl.html',
  //     controller: 'AdminUsersCtrl',
  //     controllerAs: 'vm',
  //     data: {
  //       authorizedRoles: [USER_ROLES.admin]
  //     }
  //   });

  $urlRouterProvider.otherwise('/');

  //  configure google maps provider
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyAirP89osWYJpZQPOuUrCeFaO2kF3NS9eA&callback',
    v: '3', //defaults to latest 3.X anyhow
    libraries: 'geometry'
  });

  // $locationProvider.hashPrefix('');
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $httpProvider.interceptors.push('AttachTokens');

}
config.$inject = ['$stateProvider', '$urlRouterProvider', 'uiGmapGoogleMapApiProvider', '$locationProvider',
  '$httpProvider', 'USER_ROLES'];


function run($rootScope, $location, $window, AdminAuth, $state, USER_ROLES, AUTH_EVENTS) {
  // I PROBABLY DONT NEED ANY OF TH CODE BELOW AS THIS WAS MEANT FOR USE IN TEMPLATES
  $rootScope.currentUser = null;
  $rootScope.userRoles = USER_ROLES;
  $rootScope.isAuthorized = AdminAuth.isAuthorized;

  $rootScope.setCurrentUser = function(user) {
    $rootScope.currentUser = user;
  };

  // event, toState, toParams, fromState, fromParams, options){ ... }
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {

    let authorizedRoles = toState.data.authorizedRoles;

    if(toState.parent && toState.parent === 'portal' && !fromState.name) {
      event.preventDefault();
      $state.go('login');
      return;
    }

    if (authorizedRoles && !AdminAuth.isAuthorized(authorizedRoles)) {
      event.preventDefault();
      if (AdminAuth.isAuthenticated()) {
        // user is not allowed
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      } else {
        // user is not logged in
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      }
    }

  });


  $rootScope.$on('$stateChangeSuccess', function (event) {
    $window.ga('send', 'pageview', $location.path());
  });
}

run.$inject = ['$rootScope', '$location', '$window', 'AdminAuth', '$state', 'USER_ROLES', 'AUTH_EVENTS'];

angular.module(moduleName, [
    require('angular-ui-router'),
    require('npm/angular-ui-bootstrap'),
    require('angular-animate'),
    AppController,
    CharterController,
    // LocationsController.name,
    // PricingController.name,
    HomeController,
    RoutesController,
    AdminBaseController, // admin
    AdminOverviewController,
    AdminUsersController,
    AdminController, // old admin
    AdminPortalController,
    CountdownDirective,
    CardDirective,
    ViewportService,
    CalendarService,
    CharterBookingService,
    CheckoutStateService,
    AdminPortalService,
    // AdminAuthService, // remove
    // AdminAuthenticationService, // remove
    AdminAuth,
    AdminSessionService,
    GpsSocketFactory,
    AttachTokensInterceptor,
    // DirectionsService.name,
    MapConstant,
    CalendarConstant,
    BusPropsConstant,
    UserRoles,
    AuthEvents,
    'ngGeolocation',
    // 'gapi',
    'ui.calendar',
    'angularMoment',
    'btford.socket-io',
    'uiGmapgoogle-maps'
  ])
  .config(config)
  .factory('AuthInterceptor', function($rootScope, $q, AUTH_EVENTS) {
    return {
      responseError: function(response) {
        console.log('AUTH INTERCEPTOR');
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated,
          403: AUTH_EVENTS.notAuthorized,
          419: AUTH_EVENTS.sessionTimeout,
          440: AUTH_EVENTS.sessionTimeout
        }[response.status], response);
        return $q.reject(response);
      }
    };
  })
  .run(run);


export default moduleName
