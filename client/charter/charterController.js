angular.module('gillibus.charter', [])
  .controller('CharterController',
    ['$scope', '$timeout', 'moment', '$window', '$uibModal', 'viewPort', 'CalendarService',
      function($scope, $timeout, moment, $window, $uibModal, viewPort, CalendarService) {

        const bp = {
          768: 3,
          992: 4,
          1200: 5
        };

        $scope.columnCount = 5;




        // TIMES
        $scope.times = [
          '10:00am',
          '11:00am',
          '12:00pm',
          '1:00pm',
          '2:00pm',
          '3:00pm',
          '4:00pm',
          '5:00pm',
          '6:00pm',
          '7:00pm',
          '8:00pm',
          '9:00pm',
          '10:00pm'
        ];

        $scope.clock = {
          begin: '',
          end: ''
        };

        // Calendar
        $scope.calendar = {
          selectedDate: Date.now(),
          open: false,
          toggle: function() {
            this.open = !this.open;
          },
          dayTiles: [],
          populateTiles: function(base) {
            let currentDate = base;
            let nextDate = moment(base).add(1, 'days');
            do {
              this.dayTiles.push(currentDate.format("dddd, MMMM Do"));
              currentDate = nextDate;
              nextDate = moment(nextDate).add(1, 'days');
            } while (this.dayTiles.length < 7);
          }
        };

        $scope.uiConfig = {
          calendar: {
            height: 1000,
            editable: true,
            dayRender: function(date, cell) {
              console.info('DAY RENDER');
              console.log('day render', date, cell);
            },
            eventRender: function(event, element, view) {
              console.info('EVENT RENDER');
              let morning = event.start.hour() < 14;
              element.css('position', 'absolute');
              element.css('top', morning ? '0px' : '50%');
              element.css('width', '13.9%');
              element.css('height', '46%');
              element.css('zIndex', '10');


            },
            viewRender:function(view, element) {
              console.info('VIEW RENDER');
              view.dayGrid.rowEls.each(function(index, element) {
                var $el = angular.element(element);

                $el.children('.fc-content-skeleton').css('position', 'static');


                $el.css({
                  position: 'relative',
                  minHeight: '100px'
                });
                // element.css({
                //   position: 'relative',
                //   minHeight: '100px'
                // });
                // element.style.position = 'relative';
              })

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

        /*
         * CHECKOUT MODAL
         */

        $scope.open = function() {
          let modalEl = angular.element('.checkout-modal');

          let modalInstance = $uibModal.open({
            templateUrl: '../charter/checkoutModal.html',
            appendTo: modalEl,
            size: viewPort.getViewportSize() === 'xs' ? 'mobile' : 'desktop',
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
        };

        const transFormEvents = function(events) {
          return events.map(function(event, i) {
            return {
              title: event.summary,
              start: event.start.dateTime,
              end: event.end.dateTime,
              className: 'charter'
            }
          })

        };

        const getCalendarEvents = function() {
          CalendarService.getEventsForCalendar('CHARTER_CALENDAR')
            .then(function(res) {
              console.log('calendar events =', res);

              var events = res.data.items;
              $scope.eventSources = {
                color:'red',
                events: transFormEvents(events)
              };


            })

        };

        const init = function init() {
          getCalendarEvents();
        };

        init();

      }]);

