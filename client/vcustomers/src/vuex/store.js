/**
 * Created by taylor on 5/24/17.
 */
import Vue from 'vue';
import Vuex from 'vuex';


import GLOBAL from './modules/cGlobalStore';
import BOOKING from './modules/cBookingStore';
import GPS from './modules/cGpsStore';

// import * as actions from './actions';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: { GLOBAL, BOOKING, GPS }
})
