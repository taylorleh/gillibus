import angular from 'npm/angular';
import calendarUtils from '../utils/calendarUtils';
let moduleName = 'gillibus.charter';

class CharterController {

  constructor($scope, $uibModal, $timeout, moment, $window, $compile, calendarService, viewportService, charterBooking, calendarConfig, busProperties) {
    this.moment = moment;
    this.$compile = $compile;
    this.calendarService = calendarService;
    this.charterBooking = charterBooking;
    this.$uibModal = $uibModal;
    this.$timeout = $timeout;
    this.viewportService = viewportService;

    // configs
    this.buses = busProperties.buses;
    this.hours = busProperties.hours;
    this.blocks = busProperties.blocks;
    this.uiConfig = calendarConfig;

    // config extra
    this.duration = this.hours[0];
    this.timeBlock = this.blocks[1];
    this.chosenBus = this.buses[0];

    // public data
    this.daysOfMonthHash = calendarUtils.daysOfMonthHash();
    this.currentView = 'book';
    this.customerData = {
      name: '',
      phone: ''
    };

    this.stripeValidation = {};
    this.chosenDate = {};

    this.stripeFormOptions = {
      onSubmit: (error, response, event) => {
        if (!error) {

        }
      }
    };

    this.stripeFormOptions.onBeforeValidSubmit = this.onBeforeValidSubmit.bind(this);


    let cal = this.uiConfig.calendar;
    cal.dayRender = this.dayRender.bind(this);
    cal.viewRender = this.viewRender.bind(this);
    cal.eventRender = this.eventRender.bind(this);

    this.$scope = $scope;
    this.init();
  }

  getHtmlBlock(block) {
    let csClass = block === 'MORNING' ? ['early-book', 'Book Morning'] : ['late-book', 'Book Evening'];

    return `
    <div class="${csClass[0]}">
    <button class="hide-xs show-sm" ng-click=\"vm.onEventClick($event);\">${csClass[1]}</button>
    <button class="show-xs hide-sm" ng-click=\"vm.onEventClick($event);\">${csClass[1].split(' ')[1]}</button>
    </div>`;
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
    this.calendarService.getEventsForCalendar('CHARTER_CALENDAR')
      .then(res => {
        let events = res.data.items;
        let transformed = this.transFormEvents(events);
        this.eventSources = {
          color: 'red',
          events: transformed
        };
      });
  }

  beginCheckoutPhase() {
    let modalEl = angular.element('.checkout-modal');
  }

  onEventClick(event) {
    console.log('click', event);
    let data = angular.element(event.target).parent().parent().data('date');
    let time = this.moment(data).toDate();
    let schedule = this.daysOfMonthHash[time];
    this.chosenDate = this.moment(data).format('LL');
    this.changeView('checkout');
  }


  onTimeBlockChange(event) {
    if (this.timeBlock === 'Night') {
      this.hours[0].disabled = false;
      this.hours[1].disabled = false;
      this.duration = this.hours[0];
    } else {
      this.hours[0].disabled = true;
      this.hours[1].disabled = true;
      this.duration = this.hours[2];
    }
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


  processPayment(event) {
    console.log('attempting to submit', event);
  }


  /**
   * invoked after the stripe form has successfully created a token
   *
   * @function onBeforeValidSubmit
   * @param {Object} token - a stripe token object
   * @param {Number} token.id = token id
   * @returns None
   *
   */
  onBeforeValidSubmit(token) {
    let totalAmount = this.chosenBus.dayRate * this.duration.label;
    let tokenId = token.id;
    this.charterBooking.purchaseCharter(tokenId, totalAmount * 100)
      .then(this.createNewCalendarEvent.bind(this))
      .catch(err => {
        console.error('Could not create a charter purchase!', err);
      });
  }


  createNewCalendarEvent(stripeResponse) {


    let startDay = this.moment(this.chosenDate);
    if(this.timeBlock.name === 'Night') {
      startDay.hour(17);
    } else {
      startDay.hour(10);
    }

    let endTime = this.moment(startDay).add(this.duration.label, 'hour');


    let event = {
      summary: `Charter for: ${this.customerData.name}`,
      start: {
        dateTime: startDay.toISOString(),
        timeZone: 'America/Los_Angeles'
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'America/Los_Angeles'
      }
    };
    this.calendarService.createCalendarEvent(event, 'CHARTER_CALENDAR')
      .then(function(res) {
        this.init();
        this.changeView('book');

      }.bind(this));

  }


  /**
   * Invoked after all events and days have been rendered
   *
   * @function viewRender
   * @param view - contains properties associated to the calendar and view
   *
   */
  viewRender(view) {
    view.dayGrid.rowEls.each(function(index, element) {
      let $el = angular.element(element);

      $el.children('.fc-content-skeleton').css('position', 'static');

      $el.css({
        position: 'relative',
        minHeight: '100px'
      });
    });
  }


  /**
   * Invoked after each event is rendered to the calendar
   *
   * @function eventRender
   * @param {Object} event - contains details of the event
   * @param {jQuery} element - jQuery object
   * @param {HTMLElement} view - the calendar view element
   * @returns None
   *
   */
  eventRender(event, element, view) {
    let morning = event.start.hour() < 14;
    element.css('position', 'absolute');
    element.css('top', morning ? '0px' : '50%');
    element.css('width', '13.9%');
    element.css('height', '46%');
    element.css('zIndex', '10');
  }


  /**
   * Invoked after each day is being rendered
   *
   * @function dayRender
   * @param {Date} date - date object for the day in context
   * @param {jQuery} cell - jquery object of the day cell
   * @returns None
   *
   */
  dayRender(date, cell) {
    let key = this.moment(date.toISOString()).startOf('day').toDate();
    let schedule = this.daysOfMonthHash[key] || {};

    if (!schedule.morning) {
      this._decorateCellAvailability(cell, 'MORNING');
    }
    if (!schedule.evening) {
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
    return this.calendarService.getBusyFromRange('CHARTER_CALENDAR', start, end)
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
   * changes the view of the page. This is mainly invokes from click handlers from template.
   *
   * @param {String} viewName - the name of the view to change to
   * @function changeView
   * @return None
   *
   * */
  changeView(viewName) {
    this.currentView = viewName.toLowerCase();
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

CharterController.$inject = ["$scope", "$uibModal", "$timeout", "moment", "$window", "$compile", "calendarService",
  "viewportService", "charterBooking", "calendarConfig", "busProperties"];
angular.module(moduleName, []).controller('CharterController', CharterController);

export default moduleName

