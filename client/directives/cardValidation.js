/**
 * Created by taylor on 3/4/17.
 */

import angular from 'npm/angular';
let moduleName = 'gillibus.directive.cardValidation';


function StripeForm(viewportService, $timeout) {
  console.log('vp service', viewportService);
  console.log('this', this);

  // function onCardChange(result) {
  //   console.log('on card change', result);
  //   console.log('this', this);
  // }

  function init() {
    let desktop = viewportService.isDesktop();
    let style = {
      base: {
        color: '#31325F',
        fontFamily: 'Helvetica Neue',
        fontSize: desktop ? '22px' : '1.05rem',
        fontWeight: 300,
        iconColor: '#666EE8',
        lineHeight: '65px',

      },
      invalid: {
        color: '#cc4f55'
      }

    };
    let elements = stripe.elements();
    let card = elements.create('card', { style: style });
    this.card = card;
    card.on('change', this.onCardChange.bind(this));

    $timeout(e => {
      card.mount('#card-element');
    });
  }

  function _link(scope, element, attrs) {
    scope.validation = null;

    scope.onCardChange = (result) => {
      console.log('result', result);
      element.find('.success').hide();
      let erEl = element.find('.error').hide();

      if (result.token) {

      } else if (result.error) {
        erEl.text(result.error.message);
        erEl.show();
      }
      scope.validation = result;
    };

    scope.processPayment = (event) => {
      if (scope.validation && scope.validation.complete) {
        console.log('IS VALID SUBMITTING!');
        stripe.createToken(scope.card)
          .then(result => {
            console.log('GOT RESPONSE', result);
          })
      }
    };


    init.call(scope);
  }


  return {
    restrict: 'EA',
    templateUrl: '../directives/partials/stripeForm.tpl.html',
    replace: true,
    scope: {
      cardValidation: '=',
      cardObject: '='
    },
    link: _link
  };
}

StripeForm.$inject = ['viewportService', '$timeout'];

angular.module(moduleName, []).directive('stripeForm', StripeForm);
export default moduleName;
