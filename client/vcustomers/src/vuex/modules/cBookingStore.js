/**
 * Created by taylor on 5/24/17.
 */
import Vue from 'vue';
import moment from 'moment';

const state = {
  events: [],
  monthKey: (new Date()).getMonth(),
  yearKey:(new Date()).getUTCFullYear()
};

const mutations = {
  'SET_EVENTS' (state, events) {
    state.events = events;
  },
  'SET_MONTH' (state, month) {
    state.monthKey = month;
  },
  'SET_YEAR' (state, year) {
    state.yearKey = year;
  }

};

const actions = {
  fetchEvents({ commit }, payload) {
    Vue.http.post('calendar/events', {
        calendar: payload.calendar,
        timeMin: payload.timeMin
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log('new items', data);
        let allItems = data.items.map(item => {
          return {
            title: item.description,
            start: item.start.dateTime,
            end: item.end.dateTime
          }
        });
        commit('SET_EVENTS', allItems);
      })
  },
  SUBTRACT_MONTH({ commit, state }) {
    if(state.monthKey -1 >= 0) {
      commit('SET_MONTH', state.monthKey-1);
    } else {
      let year = moment().year(state.yearKey).subtract(1, 'year').year();
      commit('SET_YEAR', year);
      commit('SET_MONTH', 11);
    }
  },
  ADD_MONTH({ commit }) {
    if(state.monthKey+1 <= 11) {
      commit('SET_MONTH', state.monthKey+1);
    } else {
      let year = moment().year(state.yearKey).add(1, 'year').year();
      commit('SET_YEAR', year);
      commit('SET_MONTH', 0);
    }
  }

};

const getters = {
  events: state => state.events,
  yearKey: state => state.yearKey,
  monthKey: state => state.monthKey
};

export default {
  state,
  mutations,
  actions,
  getters
};
