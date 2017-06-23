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
//ADMIN
import ADMIN_USERS from './modules/aUsersStore';
import ADMIN_BUS from './modules/aBusStore';
import ADMIN_RULES from './modules/aPriceRulesStore';
import ADMIN_OVERVIEW from './modules/admin/aOverviewStore';

Vue.use(Vuex);

const store = new Vuex.Store({

  modules: {
    GLOBAL, BOOKING, GPS, CHECKOUT, DIALOG,
    ADMIN_BUS, ADMIN_USERS, ADMIN_RULES, ADMIN_OVERVIEW
  },

  actions: {
    handleUnauthorized() {
      let x = Vue;
      let y = Vuex;
      let that = this;

      console.log('handling unauthorized user');
    }
  }

});

export default store;
