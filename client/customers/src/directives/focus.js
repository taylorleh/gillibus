import angular from 'npm/angular';

export default angular.module('gillibus.directive.focus', [])
.directive('glFocus', [function () {
  return {
    restrict:'A',
    link:function ($scope, element, attr) {

      element.bind('input', function (event) {
        let el = event.target;
        if (el.value.length >= 2) {
          console.log('focusing next');
          angular.element(el).parent().next().find('input').focus();
        }
      });
    }
  }
}]);
