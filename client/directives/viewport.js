/**
 * Created by taylor on 12/9/16.
 */
import angular from 'npm/angular';
export default angular.module('gillibus.directive.viewport', [])
  .directive('windowResizer', function($window) {
    return {
      restrict: 'A',
      template: '<tbody  ng-include="templateUrl" class="table-hover"></tbody>',
      link: function(scope) {

        $window.onresize = function() {
          changeTemplate();
          scope.$apply();
        };
        changeTemplate();

        function changeTemplate() {
          let screenWidth = $window.innerWidth;
          if (screenWidth < 768) {
            scope.templateUrl = '../charter/tbl-2.html';
          } else if (screenWidth < 992) {
            scope.templateUrl = '../charter/tbl-3.html';
          } else if(screenWidth < 1200) {
            scope.templateUrl = '../charter/tbl-4.html';
          } else {
            scope.templateUrl = '../charter/tbl-5.html';
          }
        }
      }
    }
  });
