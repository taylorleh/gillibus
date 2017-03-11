import angular from 'npm/angular';
let moduleName = 'gillibus.directive.countdownSubheader';

// class Countdown {
//   constructor() {
//     this.require='ngModel';
//     this.restrict = 'A';
//     this.templateUrl = '../directives/countdownTemplate.html';
//     this.scope = {
//       countdown: '='
//     };
//
//   }
//
//   link(scope, element, attributes) {
//     console.log('countdown', arguments);
//     scope.$watch('countdown', function(newVal) {
//       console.log('timer changed calue', newVal);
//     })
//   }
// }


function Countdown () {
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
}

angular.module(moduleName, []).directive('countdown', Countdown);

export default moduleName
