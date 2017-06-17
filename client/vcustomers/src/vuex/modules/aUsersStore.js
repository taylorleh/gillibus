/**
 * Created by taylor on 6/1/17.
 */

import api from 'api/admin';

const state = {
  foo: 'bar',
  adminUsers: [],
  newUserEmail: ''
};

const mutations = {
  SET_ADMIN_USERS: (state, value) => {
    state.adminUsers = value;
  },

  SET_NEW_ADMIN_USER: (state, value) => {
    state.newUserEmail = value;
  }
};

const actions = {
  getAdminUsers: ({ commit }) => {
    api.post('/users')
      .then(response => {
        commit('SET_ADMIN_USERS', response.data.users);
      })
      .catch((err) => {
        if (err) {
        }
      })

  },

  setNewAdminUser({ commit }, payload) {
    commit('SET_NEW_ADMIN_USER', payload);
  },

  addNewAdmin({ commit, dispatch }, newUser) {
    return api.post('/sendtoken', {
        user: newUser
      })
      .then(response => {
        dispatch('addMessage', {
          title: 'Admin Successfully Added',
          description: response.data.msg,
          type: 'success'
        });
        commit('SET_NEW_ADMIN_USER', '');
        return response.data;
      })
      .catch(error => {
        console.error('could not add a new user', error);
        dispatch('addMessage', {
          title: 'Error adding new admin user',
          description: 'Could not add new admin',
          type: 'error'
        });

      })
  }
};

const getters = {
  adminUsers: state => state.adminUsers,
  newUserEmail: state => state.newUserEmail
};

export default {
  state,
  mutations,
  actions,
  getters
}
