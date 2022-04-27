/**
 * Created by taylor on 5/31/17.
 */

const state = {
  polling: false,
  position: {
    coords: { longitude: null, latitude: null }
  },
  watchId: null
};

const getters = {
  polling: $state => $state.polling,
  position: $state => $state.position
};

const mutations = {
  SET_POLLING:(state, val) => {
    state.polling = val;
  },
  SET_WATCH_ID: (state, id) => {
    state.watchId = id;
  },
  UPDATE_POSITION: (state, position) => {
    state.position = position;
  }
};

const actions = {
  setIsPolling: ({commit}) => {
    commit('SET_POLLING', true);
  },
  beginPollingGps: ({ commit }, options) => {
    const id = window.navigator.geolocation.watchPosition(
      position => {
        console.log(`GOT LOCATION ${position.coords}`);
        commit('UPDATE_POSITION', position);

      },
      error => {
        console.log(`GOT ERROR ${error}`);

      },
      options
    );
    commit('SET_WATCH_ID', id);
  },

  clearPosition: ({commit}) => {
    commit('UPDATE_POSITION', { coords: { longitude: null, latitude: null}})
    commit('SET_POLLING', false);
  }
};

export default {
    state,
    getters,
    mutations,
    actions
};
