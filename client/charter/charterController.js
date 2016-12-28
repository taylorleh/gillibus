angular.module('gillibus.charter', [])
  .controller('CharterController',
    ['$scope', '$timeout', 'moment', '$window', '$uibModal','viewPort' ,function($scope, $timeout, moment, $window, $uibModal, viewPort) {

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
        begin:'',
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






      /*
      ****************
      * SLICK CAROUSEL
      ****************
      */


      // config
      $scope.slickConfig = {
        enabled: true,
        autoplay: false,
        draggable: false,
        mobileFirst: true,
        slickPause: '',
        autoplaySpeed: 3000,
        slidesToShow: 2,
        method: {},
        event: {
          beforeChange: function(event, slick, currentSlide, nextSlide) {
          },
          afterChange: function(event, slick, currentSlide, nextSlide) {
          },
          breakpoint: function(event, slick, currentSlide, nextSlide) {
            $scope.columnCount = bp[slick.activeBreakpoint] || 2;
          },
          init: function(event, slick) {
            $scope.columnCount = bp[slick.activeBreakpoint] || 2;

          }
        },
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 4
            }
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 5
            }
          }

        ]
      };

      $scope.updateCarousel = function(date) {
        $scope.calendar.dayTiles = [];
        $timeout(function() {
          $scope.calendar.populateTiles(moment(date));
        }, 0);

      };


      /*
      * CHECKOUT MODAL
      */

      $scope.open = function () {
        let modalEl = angular.element('.checkout-modal');

        let modalInstance = $uibModal.open({
          templateUrl: '../charter/checkoutModal.html',
          appendTo: modalEl,
          size: viewPort.getViewportSize() === 'xs' ? 'lg' : 'md',
          controller: function ($scope) {
            $scope.user = {};

            $scope.process = function (args) {
              Stripe.card.createToken({
                number: '',
                cvc: '',
                exp_month:'',
                exp_year: ''

              }, function (err, resp) {

              })
            }


          }
        });
      };

      const init = function init() {
        let hourIndex = (new Date()).getHours();
        if(hourIndex < 10) {
          hourIndex = 0;
        } else {
          hourIndex -= 10;
        }
        $scope.calendar.populateTiles(moment());
        $scope.clock.begin = $scope.times[hourIndex];
      };

      init();

    }]);

