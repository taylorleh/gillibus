import Vue from 'vue';
import Vuex from 'vuex'

// MODULES
import global from './modules/globalStore';
import bus from './modules/busStore';
import adminUsers from './modules/adminUsersStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { global, bus, adminUsers }
});
