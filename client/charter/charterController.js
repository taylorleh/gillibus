angular.module('gillibus.charter', [])
  .controller('CharterController', ['$scope', '$timeout', 'moment', function($scope, $timeout, moment) {

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

    // Carousel
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

    $scope.calendar.populateTiles(moment());

  }]);

