/**
 * Created by taylor on 3/4/17.
 */
import angular from 'npm/angular';
let moduleName = 'gillibus.service.charterBooking';

class CharterBooking {
  constructor($http) {
    this.$http = $http;
    this.standardSlotPrice = 250;
  }

  purchaseCharter(token, amount) {
    let api = [document.location.origin, 'api/v1/booking/purchase'].join('/');

    if (!token) {
      return Promise.reject();
    }

    return this.$http({
      method: 'POST',
      url: api,
      data: {
        stripeToken: token,
        amount: amount || this.standardSlotPrice
      }
    });
  }

}



CharterBooking.$inject = ['$http'];

angular.module(moduleName, []).service('charterBooking', CharterBooking);

export default moduleName

