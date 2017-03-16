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
    this.initTimeBlock(value.name.toLowerCase());
    this.setBusSchedule(this.schedule);
  }


  get checkoutBookEventColor() {
    return this.checkoutBookBus.colorId;
  }


  get calculatedRate() {
    switch (this._checkoutBookTimeBlock.name) {
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
    this.hours = busProperties.hours;
    this.checkoutBookCustName = '';
    this.checkoutBookCustPhone = '';
    this.checkoutBookBus = busProperties.buses[0];
    this._checkoutBookTimeBlock = busProperties.blocks[1];
    this.checkoutBookDuration = busProperties.hours[0];
    this._calculatedRate = '';
  }


  setBusSchedule(schedule) {
    let enteringTime = this._checkoutBookTimeBlock.name.toLowerCase();
    let firstEnabledIndex = null;

    let refined = this.busProperties.buses.map((bus, index) => {
      bus.disabled = false;
      let busSchedule = schedule[bus.name.toUpperCase()];
      let busFreeInBlockContext = busSchedule[enteringTime];

      if (!busFreeInBlockContext) {
        bus.disabled = true;
      } else if (firstEnabledIndex === null) {
        firstEnabledIndex = index;
      }
      return bus;
    });
    this.checkoutBookBus = this.buses[firstEnabledIndex];
    this.buses = refined;
  }


  updateDurationRestriction(timeBlockCtx) {
    if(timeBlockCtx.toLowerCase() === 'day') {
      this.hours[0].disabled = true;
      this.hours[1].disabled = true;
      this.checkoutBookDuration = this.hours[2];
    } else {
      this.hours[0].disabled = false;
      this.hours[1].disabled = false;
      this.checkoutBookDuration = this.hours[0];
    }
  }

  initTimeBlock(block) {
    let { context, notContext } = {
      context: block === 'day' ? 'day' : 'night', notContext: block === 'day' ? 'night' : 'day'
    };

    this._checkoutBookTimeBlock = this.busProperties.blocks[context === 'day' ? 0 : 1];

    let shouldRestrictOtherBlock = this.buses.every(bus => {
      let b = this.schedule[bus.name.toUpperCase()];
      return !b[notContext];
    });

    if (shouldRestrictOtherBlock) {
      this.blocks[notContext === 'day' ? 0 : 1].disabled = true;
    }

    this.updateDurationRestriction(context);

  }

  initNewFormState(timeBlock, schedule) {
    this.schedule = schedule;
    this.initTimeBlock(timeBlock);
    this.setBusSchedule(schedule);
  }


  purchaseCharter(token, amount) {
  }

}


CheckoutStateService.$inject = ['$http', 'busProperties'];

angular.module(moduleName, []).service('charterCheckoutStateService', CheckoutStateService);

export default moduleName


