/**
 * Created by taylor on 3/4/17.
 */

import angular from 'npm/angular';
let moduleName = 'gillibus.directive.cardValidation';


class StripeForm {
  constructor() {
    this.restrict = 'EA';
    this.templateUrl = '../directives/partials/stripeForm.tpl.html';
    this.replace = true;
    this.scope = {
      cardValidation: '=',
      cardObject: '='
    };

  }

  link(scope, element, attrs) {
    let el = element;
    let s = scope;
    let self = this;

    scope.onCardChange = (result) => {
      console.log('result', result);
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


  static stripeFormFactory() {
    StripeForm.instance = new StripeForm();
  }
}




//
// function StripeForm() {
//   function _link(scope, element, attrs) {
//       let el = element;
//       let s = scope;
//       let self = this;
//
//       scope.onCardChange = (result) => {
//         console.log('result', result);
//         element.find('.success').hide();
//         let erEl = element.find('.error').hide();
//
//         if (result.token) {
//
//         } else if(result.error) {
//           erEl.text(result.error.message);
//           erEl.show();
//         }
//
//       };
//
//       scope.bindCardChange = (cardObj) => {
//         if (cardObj) {
//           cardObj.on('change', angular.bind(scope, scope.onCardChange));
//         }
//       };
//
//       scope.$watch('cardObject', angular.bind(scope, scope.bindCardChange));
//
//       scope.$watch('cardValidation', e => {
//
//       })
//   }
//
//
//   return {
//     restrict: 'EA',
//     templateUrl: '../directives/partials/stripeForm.tpl.html',
//     replace: true,
//     scope: {
//       cardValidation: '=',
//       cardObject: '='
//     },
//     link: _link
//   };
// }

angular.module(moduleName, []).directive('stripeForm', StripeForm.stripeFormFactory);
export default moduleName;
