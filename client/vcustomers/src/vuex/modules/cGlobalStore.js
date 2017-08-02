import Vue from 'vue';

const state = {
  // flags & environment vars
  PRODUCTION: true,
  USE_SERVICES: false,

  busNames: ['Gillibus', 'Charlie', 'G3', 'Starship'],
  busIcons: {
    GILLIBUS: require('../../assets/images/gillibus.png'),
    CHARLIE: require('../../assets/images/charlie.png'),
    G3: require('../../assets/images/g3.png'),
    STARSHIP: require('../../assets/images/starship.png')
  }
};

const mutations = {
  SET_PRODUCTION_MODE(state, mode) {
    state.PRODUCTION = mode;
  },

  SET_USE_SERVICES(state, servicesOn) {
    state.USE_SERVICES = servicesOn;
  }
};

const actions = {
  socket_testMessage(context, payload) {},

  /**
   * Sets the global environment variable to enable and
   * disable features, replace expensive API calls, etc.
   *
   * @param dispatch
   * @param {('production'|'development')} mode - current environment
   */
  setEnvironmentMode({ commit }, mode) {
    if (String(mode).toUpperCase() === 'DEVELOPMENT') {
      commit('SET_PRODUCTION_MODE', false);
    } else {
      commit('SET_PRODUCTION_MODE', true);
    }
  },

  /**
   * This will be set when staging to ensure 3rd party
   * services, components, api, etc are behaving as
   * expected.
   *
   * @param commit
   * @param useServices
   */
  setServiceUsage({commit}, useServices) {
    commit('SET_USE_SERVICES', useServices);
  }

};

const getters = {
  busNames: state => state.busNames,
  busIcons: state => state.busIcons,
  PRODUCTION: state => state.PRODUCTION,
  USE_SERVICES: state => state.USE_SERVICES
};

export default {
  state,
  mutations,
  actions,
  getters
};

