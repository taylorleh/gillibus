angular.module('gillibus.service.calendar', [])
  .factory('CalendarService', function ($http) {
    var host = document.location.origin;
    var service = {};

    service.getEventsForCalendar = function(calendar) {
      return $http({
        method: 'POST',
        data: {calendar: calendar},
        url:[host,'calendar/events'].join('/')
      });
    };

    return service;

  });

