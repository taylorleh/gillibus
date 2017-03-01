import angular from 'npm/angular'
let moduleName = 'gillibus.charter';


class CharterController {

  constructor($scope, $timeout, moment, $window, CalendarService) {
    this.bp = {
      768: 3,
      992: 4,
      1200: 5
    };

    this.moment = moment;
    this.CalendarService = CalendarService;

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

    let cal = this.uiConfig.calendar;
    cal.dayRender = this.dayRender;

    this.$scope = $scope;
    this.init();
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
        this.$scope.$apply();
      });
  }

  dayRender(date, cell) {
    console.log('day render', arguments);

  }


  init() {
    this.getCalendarEvents();
  }

}

CharterController.$inject = ["$scope", "$timeout", "moment", "$window", "CalendarService"];
angular.module(moduleName, []).controller('CharterController', CharterController);

export default moduleName

