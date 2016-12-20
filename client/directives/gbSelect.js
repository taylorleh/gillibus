/**
 * Created by taylor on 12/18/16.
 */

angular.module('gillibus.directive.select', [])
.directive('gbSelect', function() {
  return {
    restrict: 'A',
    templateUrl: 'directives/gbSelect.html',
    replace:false,
    transclude:false,
    scope: {
      settings: '='
    },
    link:function(scope, elem, attr) {
      console.log('directive link function', arguments);
      let gbContainer = angular.element(elem);
      let opts;
      let gbSelect = angular.element(document).find('.select');
      let gbOptsList = gbSelect.find('.optList');
      let init = () => {
        console.log('gb sleect', gbOptsList)
        opts = angular.extend(angular.copy(scope.settings), {
          placeHolder: scope.placeHolder || 'hi'

        });

        console.log(scope);

        if(!gbContainer.hasClass('gb-select')) {
          console.log('adding select class');
          gbContainer.addClass('gb-select');
        }

        gbSelect.on('click', function() {
          console.log('clicked on select');
          gbOptsList.toggleClass('hidden');

        });



      };


      init();

    }


  }
});
