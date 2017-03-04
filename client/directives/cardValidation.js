/**
 * Created by taylor on 3/4/17.
 */

import angular from 'npm/angular';
let moduleName = 'gillibus.directive.cardValidation';


function CardValidation() {
  return {
    restrict: 'A',
    template: `<div class="outcome">
          <div class="error"></div>
          <div class="success">
            Success! Your Stripe token is <span class="token"></span>
          </div>
        </div>`,
    scope: {
      cardValidation: '=',
      cardObject: '='
    },
    link: (scope, element, attrs) => {
      let el = element;
      let s = scope;
      let self = this;

      scope.onCardChange = (result) => {
        element.find('.success').hide();
        let erEl = element.find('.error').hide();

        if (result.token) {

        } else if(result.error) {
          erEl.text(result.error.message);
          erEl.show();
        }

      };

      scope.bindCardChange = (cardObj) => {
        if (cardObj) {
          cardObj.on('change', angular.bind(scope, scope.onCardChange));
        }
      };

      scope.$watch('cardObject', angular.bind(scope, scope.bindCardChange));

      scope.$watch('cardValidation', e => {

      })
    }
  };
}

angular.module(moduleName, []).directive('cardValidation', CardValidation);
export default moduleName;
