import angular from 'npm/angular';
let moduleName = 'gillibus.service.calendar';

class CalendarService {

  _transformBusAgenda(response) {
    let colorKeys = this.busProperties.buses.reduce((memo, bus) => {
      memo[bus.colorId] = { name: bus.name, amFree: true, pmFree: true };
      return memo;
    }, {});

    let items = response.data.items;
    items.forEach(function(event){
      let midday = this.moment(event.start.dateTime).hour(14);
      let eventBlock = midday.isSameOrAfter(event.start) ? 'MORNING' : 'NIGHT';
      if(eventBlock === 'MORNING') {
        colorKeys[event.colorId].amFree = false;
      } else {
        colorKeys[event.colorId].pmFree = false;
      }

    }.bind(this));

    return colorKeys;

  }

  constructor($http, busProperties, moment) {
    this.$http = $http;
    this.busProperties = busProperties;
    this.moment = moment;
  }

  getEventsForCalendar(calendar) {
    let api = [document.location.origin, 'api/v1/calendar/events'].join('/');
    return this.$http({
      method:'POST',
      url: api,
      data: {calendar: calendar}
    });
  }

  /**
   * Returns events for multiple calendars
   *
   * @method getEventsForCalendars
   * @param {String[]} calendarIds - an array of calendar IDs
   * @return {Promise[]} an array of promises
   *
   */
  getEventsForCalendars(calendarIds) {
    let promises = calendarIds.map(id => {
      return this.getEventsForCalendar(id);
    });

    return Promise.all(promises)
      .then(response => {
        return response;
      })
  }

  getBusyFromRange(calendar, start, end) {
    let api = [document.location.origin, 'api/v1/calendar/freebusy'].join('/');
    return this.$http({
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
    let api = `${document.location.origin}/api/v1/calendar/events/create`;
    return this.$http({
      method: 'POST',
      url: api,
      data: {
        calendar: calendar,
        eventData: eventData
      }
    });
  }


  /**
   *
   * @param {String} calendar - calendar id
   * @param {Date} start - start time to filter by
   * @param {Date} end - end time to filter by
   * @return {Promise}
   */
  getBusAvailabilityForDate(calendar, start, end) {
    let api = `${document.location.origin}/api/v1/calendar/bus/agenda`;
    return this.$http({
      method:'POST',
      url: api,
      data: {
        calendar: calendar,
        timeMin: start,
        timeMax: end
      }
    })
      .then(this._transformBusAgenda.bind(this))

  }


}



CalendarService.$inject = ['$http', 'busProperties', 'moment'];

angular.module(moduleName, []).service('calendarService', CalendarService);

export default moduleName
