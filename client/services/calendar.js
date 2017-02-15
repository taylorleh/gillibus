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

    service.getFreeBusyForCalendar = function(start, end) {
      return $http({
        method: 'POST',
        data: {
          timeMin:null,
          timeMax: null
        },
        url:[host,'calendar/freebusy'].join('/')
      });
    };

    return service;
  });

