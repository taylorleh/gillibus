import Vue from 'vue';

const state = {
  busNames: ['Gillibus', 'Charlie', 'G3', 'Starship'],
  busIcons: {
    GILLIBUS: require('../../assets/images/gillibus.png'),
    CHARLIE: require('../../assets/images/charlie.png'),
    G3: require('../../assets/images/g3.png'),
    STARSHIP: require('../../assets/images/starship.png')
  }
};

const mutations = {

};

const actions = {
  socket_testMessage(context, payload) {

  }
};

const getters = {
  busNames: state => state.busNames,
  busIcons: state => state.busIcons
};

export default {
  state,
  mutations,
  actions,
  getters
};

