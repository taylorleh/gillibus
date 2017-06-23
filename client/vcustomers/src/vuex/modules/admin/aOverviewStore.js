/**
 * Created by taylor on 6/22/17.
 */
import api from 'api/admin';
import  { serializeCharges }  from 'utils/adminUtils/overviewUtils';
import moment from 'moment';

const state = {
  stripeMonthlyCharges: [],
  availableBalance: [],
  pendingBalance: []
};

const mutations = {
  SET_CHARGES(state, charges){
    state.stripeMonthlyCharges = charges;
  },
  SET_AVAILABLE_BALANCE(state, balance) {
    state.availableBalance = balance;
  },
  SET_PENDING_BALANCE(state, balance) {
    state.pendingBalance = balance;
  }
};


const actions = {

  /**
   * Retrieves charges for a given time period, typically 1 month
   *
   * @param commit
   * @param dispatch
   * @param payload
   * @return {Promise.<TResult>}
   *
   */
  getCharges({ commit, dispatch }, payload) {
    return api.post('/bank/charges/list', {
        begin: payload.begin
      })
      .then(res => {
        commit('SET_CHARGES', serializeCharges(res.data.data));
      })
      .catch(err => {
        dispatch('addMessage', {
          type: 'error',
          title: 'Error retrieving monthly charges'
        });
      })
  },


  /**
   * Returns Stripe account balance including pending and
   * available balances
   *
   * @param commit
   *
   */
  getAccountBalance({ commit }) {
    api.post('/bank/balance/list')
      .then(results => {
        let { pending, available } = results.data;
        commit('SET_PENDING_BALANCE', pending);
        commit('SET_AVAILABLE_BALANCE', available);
      })
      .catch(error => {
        dispatch('addMessage', {
          type: 'error',
          title: 'Error retrieving monthly charges'
        });
      })
  }
};

const getters = {
  stripeMonthlyCharges: state => state.stripeMonthlyCharges,
  lastFiveCharges: state => {
    return state.stripeMonthlyCharges.slice(0, 5);
  },

  pendingBalance: state => state.pendingBalance,
  availableBalance: state => state.availableBalance,

  chargesAfterDate: (state) => (date) => {
    let allCharges = state.stripeMonthlyCharges;
    return allCharges.reduce((memo, item) => {
      let pDate = moment.unix(item.created).startOf('day');
      if (pDate.isSameOrAfter(date)) {
        let diff = pDate.diff(date, 'days');
        memo[diff]++;
      }
      return memo;
    }, new Array(7).fill(0));

  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
