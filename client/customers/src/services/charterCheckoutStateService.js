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
    this.updateDurationRestriction(value.name.toLowerCase());
  }


  get checkoutBookEventColor() {
    return this.checkoutBookBus.colorId;
  }


  calculatedRate(block) {
    switch (block) {
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

  minHours(busObject, blockInContext) {
    return this.buses.reduce((memo, bus) => {
      if(busObject.name  === bus.name) {
        memo = busObject[`duration${blockInContext}Min`];
      }
      return memo;
    }, 0);
  }


  /**
   * retrives the total calculated price
   *
   * @method checkoutTotalPrice
   * @return {number}
   */
  get checkoutTotalPrice() {
    let _timeInContext = this._checkoutBookTimeBlock.name;
    let _busInContext = this.checkoutBookBus;
    let hoursBooked = this.checkoutBookDuration.label;
    let primeTimeRate = null;
    let overTimeHours = null;
    let baseRate = this.calculatedRate(_timeInContext);
    let baseHours = this.minHours(_busInContext, _timeInContext);
    if(_timeInContext === 'Night') {
      overTimeHours = hoursBooked - 4;
      primeTimeRate = _busInContext.additionalNight;
    }
    if(_timeInContext === 'Day') {
      return hoursBooked * baseRate;
    } else {
      return ((baseHours * baseRate )+ (overTimeHours * primeTimeRate));
    }

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

  restrictTimeBlocks(blockOutsideCtx, schedule) {
    this.blocks[0].disabled = false;
    this.blocks[1].disabled = false;
    if(!schedule[blockOutsideCtx.name]) {
      this.blocks[blockOutsideCtx.index].disabled = true;
    }
  }

  initNewFormState(timeBlock, schedule) {
    let { otherContextBlock, otherIndex } = {
      otherContextBlock: (timeBlock === 'day' ? 'night' : 'day'),
      otherIndex: (otherContextBlock === 'day' ? 1 : 0)
    };

    this.schedule = schedule;
    this._checkoutBookTimeBlock = this.busProperties.blocks[(timeBlock === 'day' ? 0 : 1)];
    this.updateDurationRestriction(timeBlock);
    this.restrictTimeBlocks({name: otherContextBlock, index: otherIndex}, schedule);
    this.setBusSchedule(schedule);
  }


  purchaseCharter(token, amount) {
  }

}


CheckoutStateService.$inject = ['$http', 'busProperties'];

angular.module(moduleName, []).service('charterCheckoutStateService', CheckoutStateService);


export default moduleName


