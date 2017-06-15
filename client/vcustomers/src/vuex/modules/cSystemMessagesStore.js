/**
 * Created by taylor on 6/10/17.
 */
import _ from 'lodash';
import { initVanishingTimers, timers } from '../../util/messagesUtils';


// const type

const state = {
  messages: []
};

const mutations = {
  'SET_MESSAGES' (state, messages) {
    state.messages = messages;
  }
};


const actions = {
  addMessage({ commit, state, dispatch }, payload) {
    if(payload.type === 'success') {
      initVanishingTimers(payload, dispatch);
    }

    commit('SET_MESSAGES', _.cloneDeep(state.messages).concat(payload));
  },

  removeMessage({ commit, state }, payload) {
    const messageIndex = state.messages.indexOf(payload);
    let copy = _.cloneDeep(state.messages);

    if(timers.has(payload)) {
      clearTimeout(timers.get(payload));
    }

    if(messageIndex !== -1) {
      copy.splice(messageIndex, 1);
      commit('SET_MESSAGES', copy);
    } else {
      console.error('trying to commit new messages and cannot splice requested message');
    }
  }

};

const getters = {
  messages: state => state.messages
};

export default {
    state,
    getters,
    mutations,
    actions
};
