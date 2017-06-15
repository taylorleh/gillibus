/**
 * Created by taylor on 5/24/17.
 */
import Vue from 'vue';
import Vuex from 'vuex';


import GLOBAL from './modules/cGlobalStore';
import BOOKING from './modules/cBookingStore';
import GPS from './modules/cGpsStore';
import CHECKOUT from './modules/cCheckoutStore';
import DIALOG from './modules/cSystemMessagesStore';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: { GLOBAL, BOOKING, GPS, CHECKOUT, DIALOG }
})
