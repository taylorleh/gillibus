import angular from 'npm/angular';
import calendarUtils from '../utils/calendarUtils';
let moduleName = 'gillibus.charter';

class CharterController {

  constructor($scope, $timeout, moment, $window, $compile, CalendarService) {
    this.moment = moment;
    this.$compile = $compile;
    this.CalendarService = CalendarService;

    this.daysOfMonthHash = calendarUtils.daysOfMonthHash();

      this.uiConfig = {
        calendar: {
          height: 1000,
          editable: true,
          eventRender: function(event, element, view) {
            let morning = event.start.hour() < 14;
            element.css('position', 'absolute');
            element.css('top', morning ? '0px' : '50%');
            element.css('width', '13.9%');
            element.css('height', '46%');
            element.css('zIndex', '10');

          },
          viewRender: function(view, element) {
            view.dayGrid.rowEls.each(function(index, element) {
              let $el = angular.element(element);

              $el.children('.fc-content-skeleton').css('position', 'static');

              $el.css({
                position: 'relative',
                minHeight: '100px'
              });
            });
          },
          header: {
            left: 'month basicWeek basicDay agendaWeek agendaDay',
            center: 'title',
            right: 'today prev,next'
          },
          eventClick: $scope.alertEventOnClick,
          eventDrop: $scope.alertOnDrop,
          eventResize: $scope.alertOnResize
        }
      };

    this.$scope = $scope;

    let cal = this.uiConfig.calendar;
    cal.dayRender = this.dayRender.bind(this);
    this.init();
  }

  getHtmlBlock(block) {
    let csClass = block === 'MORNING' ?
      ['early-book', 'Book Morning'] :
      ['late-book', 'Book Evening'];
    let templ = `<div class="${csClass[0]}"><button ng-click=\"vm.onEventClick($event);\">${csClass[1]}</button></div>`;
    return templ;

  }

  transFormEvents(events) {
    return events.map(function(event, i) {
      return {
        title: event.summary,
        start: event.start.dateTime,
        end: event.end.dateTime,
        className: 'charter'
      }
    })
  }

  getCalendarEvents() {
    this.CalendarService.getEventsForCalendar('CHARTER_CALENDAR')
      .then(res => {
        let events = res.data.items;
        let transformed = this.transFormEvents(events);
        this.eventSources = {
          color: 'red',
          events: transformed
        };
      });
  }

  onEventClick(event) {
    console.log('click', event);
    let data = angular.element(event.target).parent().data('date');
    let time = this.moment(data).toDate();
    let schedule = this.daysOfMonthHash[time];
  }

  /**
   * Appends a booking button to a date cell provided the date cell and
   * the block in which it should be appended
   *
   * @param{Object} cell - an jquery object
   * @param {String} block - an enum specifying which block of time
   * @function _decorateCellAvailability
   * @return None
   *
   * */
  _decorateCellAvailability(cell, block) {
    let content = this.$compile(this.getHtmlBlock(block))(this.$scope);
    cell.append(content);
  }

  dayRender(date, cell) {
    let key = this.moment(date.toISOString()).startOf('day').toDate();
    let schedule = this.daysOfMonthHash[key] || {};

    if (!schedule.morning) {
      this._decorateCellAvailability(cell, 'MORNING');
    }
    if(!schedule.evening) {
      this._decorateCellAvailability(cell, 'EVENING');
    }
  }

  /**
   * gets busy times for a given month
   *
   * @param start
   * @param end
   * @return {Promise}
   *
   * */
  getFreeBusy(start, end) {
    return this.CalendarService.getBusyFromRange('CHARTER_CALENDAR', start, end)
  }


  /**
   * Invoked on success of free/busy service
   *
   * @param {Object} res - the response data
   * @param {Object} res.data.calendars - an object containing calendar keys
   * @function freeBusySuccess
   * @return {Promise}
   *
   * */
  freeBusySuccess(res) {
    let cals = res.data.calendars;
    let ctx = Object.keys(cals)[0];

    let amOrPm = (data) => {
      if (this.moment(data.start).hour() < 14) {
        return 'MORNING';
      } else {
        return 'EVENING';
      }
    };

    return cals[ctx].busy.forEach(time => {
      let slot = amOrPm(time);
      let key = this.moment(time.start).startOf('day').toDate();
      this.daysOfMonthHash[key][slot.toLowerCase()] = true;
    }, this);

  }

  /**
   * Invokes services and handles registers current month end date
   * and beginning date
   *
   * @function init
   * @return None
   *
   * */
  init() {
    let start = this.moment().toDate();
    let end = this.moment().add(1, 'month');
    this.getFreeBusy(start, end)
      .then(this.freeBusySuccess.bind(this))
      .then(this.getCalendarEvents.bind(this));
  }

}

CharterController.$inject = ["$scope", "$timeout", "moment", "$window", "$compile", "CalendarService"];
angular.module(moduleName, []).controller('CharterController', CharterController);

export default moduleName

