import angular from 'npm/angular';
let moduleName = 'gillibus.service.calendar';
const HTTP = new WeakMap();



class CalendarService {
  constructor($http) {
    HTTP.set(this, $http);
  }

  getEventsForCalendar(calendar) {
    let api = [document.location.origin, 'api/v1/calendar/events'].join('/');
    let http = HTTP.get(this);
    return http({
      method:'POST',
      url: api,
      data: {calendar: calendar}
    });
  }

  getBusyFromRange(calendar, start, end) {
    let api = [document.location.origin, 'api/v1/calendar/freebusy'].join('/');
    let http = HTTP.get(this);
    return http({
      method:'POST',
      url: api,
      data: {
        calendar: calendar,
        start: start,
        end: end
      }
    });
  }

  createCalendarEvent(eventData, calendar) {
    console.log('creating calendar event', eventData);
    let api = `${document.location.origin}/api/v1/calendar/events/create`;
    let $http = HTTP.get(this);
    return $http({
      method: 'POST',
      url: api,
      data: {
        calendar: calendar,
        eventData: eventData
      }
    });
  }


  getBusAvailabilityForDate(date) {
    let api = `${document.location.origin}/api/v1/calendar/bus/agenda`;
    let http = HTTP.get(this);
    return http({
      method:'POST',
      url: api,
      data: {calendar: calendar}
    });

  }

  static calendarFactory($http){
    return new CalendarService($http);
  }

}



CalendarService.calendarFactory.$inject = ['$http'];

angular.module(moduleName, []).factory('calendarService', CalendarService.calendarFactory);

export default moduleName
