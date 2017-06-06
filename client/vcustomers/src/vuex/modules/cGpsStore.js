/**
 * Created by taylor on 5/25/17.
 */

import _ from 'lodash';
const state = {
  activeBuses: {},
  noActiveBuses: true
};

const mutations = {
  SET_ACTIVE_BUSES(state, buses) {
    state.activeBuses = buses;
  },
  SET_NO_ACTIVE_BUSES(state, status) {
    state.noActiveBuses = status;
  }
};


const actions = {

  socket_busLocation({commit, dispatch}, payload) {
    dispatch('SET_ACTIVE_BUSES', [payload])
  },

  socket_driverLeft({commit, dispatch, state}, payload) {
    console.log(`Driver LEFT ${JSON.stringify(payload)}`);
    let active = _.cloneDeep(state.activeBuses);
    if(payload in active) {
      delete active[payload];
    }
    commit('SET_ACTIVE_BUSES', active);
    commit('SET_NO_ACTIVE_BUSES', !(Object.keys(active).length));
  },

  SET_ACTIVE_BUSES({commit, state }, payload) {
    let buses = _.cloneDeep(state.activeBuses);

    payload.forEach(driver => {
      buses[driver.bus] = driver;
    });

    commit('SET_NO_ACTIVE_BUSES', !(Object.keys(payload).length));
    commit('SET_ACTIVE_BUSES', buses);
  }

};

const getters = {
  activeBuses: state => state.activeBuses,
  noActiveBuses: $state => $state.noActiveBuses,
  busMarkers: $state => {
    return Object.keys($state.activeBuses).reduce((memo, busKey) => {
      const busData = $state.activeBuses[busKey];
      let { longitude: lng, latitude: lat } = busData.location;
      memo.push({ name: busData.bus.toUpperCase(), coords: {lng, lat} });
      return memo;
    },[]);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};

