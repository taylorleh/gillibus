import angular from 'npm/angular';
import calendarUtils from '../utils/calendarUtils';
let moduleName = 'gillibus.charter';

class CharterController {

  constructor($scope, $uibModal, $timeout, moment, $window, $compile, calendarService, viewportService) {
    this.moment = moment;
    this.$compile = $compile;
    this.calendarService = calendarService;
    this.$uibModal = $uibModal;
    this.$timeout = $timeout;
    this.viewportService = viewportService;

    this.daysOfMonthHash = calendarUtils.daysOfMonthHash();
    this.currentView = 'book';
    this.chosenDate = {};

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

    let modalInstance = this.$uibModal.open({
      templateUrl: '../charter/checkoutModal.html',
      appendTo: modalEl,
      size: 'desktop',
      windowClass: 'window-class',
      windowTopClass: 'top-class',
      controller: function($scope) {
        $scope.ran = 'hi';
        $scope.user = {
          // number:null,
          // month:null,
          year: null,
          exp: function(newValue) {
            if (!angular.isDefined(newValue)) {
              // return $scope.ran;
            }
            else {
              return $scope.ran;
              if (newValue.length <= 2) {
                let exp = newValue
                this.month = exp;
                return '1';
              } else {
                this.month = newValue;
                this.year = newValue.slice(2);
                return [this.month, '/', this.year].join('/');
              }

            }
          }
        };

        $scope.process = function(args) {
          let $form = args.target;

          Stripe.card.createToken($form, function(status, response) {
            console.log(arguments);
          });
        };

        $scope.expireChange = function(args) {
          console.log('changing', arguments);
        }

      }
    });
  }

  onEventClick(event) {
    console.log('click', event);
    let data = angular.element(event.target).parent().parent().data('date');
    let time = this.moment(data).toDate();
    let schedule = this.daysOfMonthHash[time];
    this.chosenDate = this.moment(data).format('LL');
    this.changeView('checkout');
    // this.beginCheckoutPhase();

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

  /**
   * Configures and setup stripe element
   *
   * @function   appendStripeForm
   *
   * */
  appendStripeForm() {
    let desktop = this.viewportService.isDesktop();
    let style = {
      base: {
        color:'#31325F',
        fontFamily: 'Helvetica Neue',
        fontSize: desktop ? '22px' : '1.05rem',
        fontWeight: 300,
        iconColor: '#666EE8',
        lineHeight: '65px',

      },
      invalid: {
        color: '#cc4f55'
      }

    };
    let elements = stripe.elements();
    let card = elements.create('card', {style : style});

    this.$timeout(e => {
      card.mount('#card-element');
    });
  }


  /**
   * Creates a strip token and processes the form:'
,   *
   * @param {Object} event - the event object
   * @function processPayment
   *
   * */
  processPayment(event) {

  }

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
    let view = viewName.toLowerCase();
    this.currentView = view;
    if (view === 'checkout') {
      this.appendStripeForm();
    }
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

CharterController.$inject = ["$scope", "$uibModal", "$timeout", "moment", "$window", "$compile", "calendarService", "viewportService"];
angular.module(moduleName, []).controller('CharterController', CharterController);

export default moduleName

