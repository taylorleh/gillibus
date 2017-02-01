angular.module('gillibus.directive.countdownSubheader', [])
  .directive('countdown', [function () {
    return {
      restrict:'A',
      templateUrl:'../directives/countdownTemplate.html',
      scope: {
        countdown: '='
      },
      link:function (scope, element, attrs) {
        console.log('countdown', arguments);
        scope.$watch('countdown', function(newVal) {
          console.log('timer changed calue', newVal);
        })
      }
    }
  }]);
