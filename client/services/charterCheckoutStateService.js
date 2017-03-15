/**
 * Created by taylor on 3/10/17.
 */

import angular from 'npm/angular';
let moduleName = 'gillibus.service.checkoutStateService';

class CheckoutStateService {


  get checkoutBookEventColor() {
    return this.checkoutBookBus.colorId;
  }


  get calculatedRate() {
    switch(this.checkoutBookTimeBlock.name) {
      case 'Night':
        return this.checkoutBookBus.nightRate;
        break;
      case 'Day':
        return this.checkoutBookBus.dayRate;
        break;
      default:
        console.error('default case reached');
        return 0;
    }
  }


  get checkoutBookPrice() {
    return this.calculatedRate * this.checkoutBookDuration.label;
  }


  constructor($http, busProperties) {
    this.checkoutBookCustName = '';
    this.checkoutBookCustPhone = '';
    this.checkoutBookBus = busProperties.buses[0];
    this.checkoutBookTimeBlock = busProperties.blocks[1];
    this.checkoutBookDuration = busProperties.hours[0];
    this._calculatedRate = '';
  }


  purchaseCharter(token, amount) {
  }

}



CheckoutStateService.$inject = ['$http', 'busProperties'];

angular.module(moduleName, []).service('charterCheckoutStateService', CheckoutStateService);

export default moduleName


