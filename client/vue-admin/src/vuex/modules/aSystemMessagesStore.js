/**
 * Created by taylor on 6/10/17.
 */
import _ from 'lodash';
import { pluralTypes } from '../../util/checkoutUtils';


// const type

const state = {
  successes: [],
  warnings: [],
  errors: []
};

const mutations = {
  'SET_SUCCESSES' (state, messages) {
    state.successes =  messages;
  },
  'SET_ERRORS' (state, messages) {
    state.errors =  messages;
  },
  'SET_WARNINGS' (state, messages) {
    state.warnings =  messages;
  }

};


let currentMessages = new Map();

const actions = {
  addMessage({ commit, state, dispatch }, payload) {
    console.log('payload', payload);
    const {title, description, type } = payload;
    const pluralType = pluralTypes[type];
    let copy = _.cloneDeep(state[pluralType]);
    const newMessage = { title, description, type};
    copy.push(newMessage);



    let id = setTimeout(() => {
      dispatch('removeMessage', newMessage);
    }, 5000);

    currentMessages.set(newMessage, id);
    commit(`SET_${pluralType.toUpperCase()}`, copy);
  },

  removeMessage({ commit, state }, payload) {
    let plural  = pluralTypes[payload.type];
    let mIndex = state[plural].indexOf(payload);

    let pendingRemoval = currentMessages.get(payload);
    if(pendingRemoval) {
      clearTimeout(pendingRemoval);
      currentMessages.delete(payload);
    }

    if(mIndex !== -1) {
      const newMessages = _.cloneDeep(state[plural]);
      newMessages.splice(mIndex, 1);
      commit(`SET_${plural.toUpperCase()}`, newMessages);
    } else {
      console.error('could not find payload');
    }
  }

};

const getters = {
  successes: state => state.successes,
  warnings: state => state.warnings,
  errors: state => state.errors,
  message: (state) => (message) => {
    const found = [...state.successes].filter(item => {
      return item === message;
    });

    if(found) {
      return found
    } else {
      debugger
    }

    console.log('used getter and found message');
  }
};

export default {
    state,
    getters,
    mutations,
    actions
};
