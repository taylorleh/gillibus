/**
 * Created by taylor on 6/1/17.
 */

import axios from 'axios';

const state = {
  foo: 'bar',
  adminUsers: []
};

const mutations = {
  SET_ADMIN_USERS: (state, value) => {
    state.adminUsers = value;
  }
};

const actions = {
  getAdminUsers: ({commit}) => {
    axios.post('/api/v1/admin/users')
      .then(response => {
        commit('SET_ADMIN_USERS', response.data.users);
      })
      .catch(err => {
        console.error(err);
      })

  }
};

const getters = {
  adminUsers: state => state.adminUsers
};

export default {
  state,
  mutations,
  actions,
  getters
}
