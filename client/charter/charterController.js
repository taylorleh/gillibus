angular.module('gillibus.charter', [])
  .controller('CharterController', ['$scope','$timeout', 'moment', function($scope,$timeout, moment) {

    // Calendar
    $scope.calendar = {
      selectedDate: Date.now(),
      open: false,
      toggle:function() {
        this.open = !this.open;
      },
      dayTiles: [],
      populateTiles:function(base) {
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
      slickPause:'',
      autoplaySpeed: 3000,
      slidesToShow: 5,
      method: {},
      event: {
        beforeChange: function(event, slick, currentSlide, nextSlide) {
        },
        afterChange: function(event, slick, currentSlide, nextSlide) {
        }
      }
    };

    $scope.updateCarousel = function(date) {
      $scope.calendar.dayTiles = [];
      $timeout(function() {
        $scope.calendar.populateTiles(moment(date));
      },0);

    };

    $scope.calendar.populateTiles(moment());


  }]);

