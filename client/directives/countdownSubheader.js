angular.module('gillibus.directive.countdownSubheader', [])
  .directive('countdown', [function () {
    return {
      restrict:'A',
      link:function ($scope, element, attr) {
        console.log('countdown', arguments);
      }
    }
  }]);
