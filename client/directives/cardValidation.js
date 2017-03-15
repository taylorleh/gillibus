/**
 * Created by taylor on 3/4/17.
 */

import angular from 'npm/angular';
let moduleName = 'gillibus.directive.cardValidation';
let style = {
  base: {
    color: '#31325F',
    fontFamily: 'Helvetica Neue',
    fontSize: '1.05rem',
    fontWeight: 300,
    iconColor: '#666EE8',
    lineHeight: '65px',
  },
  invalid: {
    color: '#cc4f55'
  }
};


function StripeForm(viewportService, charterBooking) {

  function _link(scope, element, attrs) {
    let desktop = viewportService.isDesktop();
    let elements = stripe.elements();
    style.base.fontSize = desktop ? '1.05rem' : '.95rem';

    scope.card = elements.create('card', { style: style });
    scope.validation = null;

    let chargePaymentWithId = (token) => {
      charterBooking.purchaseCharter(token, 100)
        .then(response => {
          console.log('SUCCESS!!!!!', response);

        })
        .catch(error => {
          console.log('ERROR FROM SERVER', error);
        })

    };

    scope.onCardChange = (result) => {
      element.find('.success').hide();
      let erEl = element.find('.error').hide();

      if (result.token) {

      } else if (result.error) {
        erEl.text(result.error.message);
        erEl.show();
      }
      scope.validation = result;
    };


    /**
     * Creates a strip token and processes the form
     *
     * @param {Object} event - the event object
     * @function processPayment
     *
     * */
    scope.processPayment = (event) => {
      if (scope.validation && scope.validation.complete) {
        stripe.createToken(scope.card)
          .then(result => {
            if(scope.options.onBeforeValidSubmit) {
              scope.options.onBeforeValidSubmit(result.token);
            } else {
              return chargePaymentWithId(result.token.id);
            }
          })
          .then(result => {
            console.log('SUCCESS', result);
            element.find('.success').show();
            scope.options.onSubmit(null, result, event);
          })
          .catch(error => {
            console.warn('STRIPE ERROR', error);
            scope.options.onSubmit(error, null, event);
          });
      }
    };
    scope.card.on('change', scope.onCardChange);
    scope.card.mount('#card-element');
  }


  return {
    restrict: 'EA',
    templateUrl: '../directives/partials/stripeForm.tpl.html',
    replace: true,
    scope: {
      options: '=',
      cardObject: '=',
      formState: '='
    },
    link: _link
  };
}

StripeForm.$inject = ['viewportService', 'charterBooking'];

angular.module(moduleName, []).directive('stripeForm', StripeForm);
export default moduleName;
