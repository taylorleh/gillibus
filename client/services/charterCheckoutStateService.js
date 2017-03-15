/**
 * Created by taylor on 3/10/17.
 */

import angular from 'npm/angular';
let moduleName = 'gillibus.service.checkoutStateService';

class CheckoutStateService {
  get checkoutBookTimeBlock() {
    return this._checkoutBookTimeBlock;
  }

  set checkoutBookTimeBlock(value) {
    this._checkoutBookTimeBlock = value;
    this.setBusSchedule(this.schedule);
  }


  get checkoutBookEventColor() {
    return this.checkoutBookBus.colorId;
  }


  get calculatedRate() {
    switch(this._checkoutBookTimeBlock.name) {
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
    this.busProperties = busProperties;
    this.buses = busProperties.buses;
    this.blocks = busProperties.blocks;
    this.checkoutBookCustName = '';
    this.checkoutBookCustPhone = '';
    this.checkoutBookBus = busProperties.buses[0];
    this._checkoutBookTimeBlock = busProperties.blocks[1];
    this.checkoutBookDuration = busProperties.hours[0];
    this._calculatedRate = '';
  }


  setBusSchedule(schedule) {
    this.schedule = schedule;
    let enteringTime = this._checkoutBookTimeBlock.name === 'Day' ? 'amFree' : 'pmFree';
    let firstEnabledIndex = null;

    let refined = this.busProperties.buses.map((bus, index) => {
      bus.disabled = false;
      let busColor = bus.colorId;
      let busFreeInBlockContext = schedule[busColor][enteringTime];
      if(!busFreeInBlockContext) {
        bus.disabled = true;
      } else if(firstEnabledIndex === null) {
        firstEnabledIndex = index;
      }
      return bus;
    });
    this.checkoutBookBus = this.buses[firstEnabledIndex];
    this.buses = refined;
  }


  initTimeBlock(block) {
    if(block === 'day') {
      this._checkoutBookTimeBlock = this.busProperties.blocks[0];
    } else {
      this._checkoutBookTimeBlock = this.busProperties.blocks[1];
    }

  }


  purchaseCharter(token, amount) {
  }

}



CheckoutStateService.$inject = ['$http', 'busProperties'];

angular.module(moduleName, []).service('charterCheckoutStateService', CheckoutStateService);

export default moduleName


