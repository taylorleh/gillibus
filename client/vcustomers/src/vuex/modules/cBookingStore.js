/**
 * Created by taylor on 5/24/17.
 */
import moment from 'moment';
import axios from 'axios';
import api from '../../api/calendarResource';
import { eventTimeBlock } from '../../util/calendarUtils';


const busKeys = ['CHARTER_CHARLIE', 'CHARTER_GILLIBUS', 'CHARTER_G3', 'CHARTER_STARSHIP'];

const state = {
  events: {},
  monthKey: (new Date()).getMonth(),
  yearKey: (new Date()).getUTCFullYear()
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

//
// fetchEvents({ commit }, payload) {
//   Vue.http.post('calendar/events', {
//       calendar: payload.calendar,
//       timeMin: payload.timeMin
//     })
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       console.log('new items', data);
//       let allItems = data.items.map(item => {
//         return {
//           title: item.description,
//           start: item.start.dateTime,
//           end: item.end.dateTime
//         }
//       });
//       commit('SET_EVENTS', allItems);
//     })

const actions = {
  fetchEvents({ commit, dispatch }, payload) {
    let { timeMin, timeMax } = payload;
    let eventsPromises = busKeys.map(key => {
      return dispatch('FETCH_CALENDAR_EVENTS', { timeMin, timeMax, key});
    });

    axios.all(eventsPromises)
      .then(allEvents => {
        return allEvents.map(busEvents => {
          return busEvents.data.items;
        })
      })
      .then(events => {
        commit('SET_EVENTS', {
          [busKeys[0].split('_')[1]]: events[0],
          [busKeys[1].split('_')[1]]: events[1],
          [busKeys[2].split('_')[1]]: events[2],
          [busKeys[3].split('_')[1]]: events[3]
        });
      });
  },
  FETCH_CALENDAR_EVENTS(context, {timeMin, timeMax, key}) {
    return api.post('/events', {
        timeMin,
        timeMax,
        calendar: key
      })
      .then(res => {
        return res;
      })
      .catch(error => {
        console.error('failed', error);
      })
  },
  SUBTRACT_MONTH({ commit, state }) {
    if (state.monthKey - 1 >= 0) {
      commit('SET_MONTH', state.monthKey - 1);
    } else {
      let year = moment().year(state.yearKey).subtract(1, 'year').year();
      commit('SET_YEAR', year);
      commit('SET_MONTH', 11);
    }
  },
  ADD_MONTH({ commit }) {
    if (state.monthKey + 1 <= 11) {
      commit('SET_MONTH', state.monthKey + 1);
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
  monthKey: state => state.monthKey,
  dayAvailability: (state, getters) => (date) => {
    let busesEvents = state.events;
    let tally = { day: 0, night: 0};

    Object.keys(busesEvents).forEach(bus => {
      const busEvents = busesEvents[bus];
      busEvents.forEach(event => {
        const eventDay = moment(event.start.dateTime);
        if (eventDay.isSame(date, 'day')) {
          const block = eventTimeBlock(event);
          tally[block.toLocaleLowerCase()]++;
        }
      })
    });

    return {
      bookDay: (tally.day < 4),
      bookNight: (tally.night < 4)
    };
  },

  busAvailability: (state) => (date) => {
    let busesEvents = state.events;
    let schedule = { CHARLIE: null, GILLIBUS:null, G3: null, STARSHIP: null } ;

    Object.keys(busesEvents).forEach((bus, index) => {
      const busEvents = busesEvents[bus];
      busEvents.forEach(event => {
        const eventDay = moment(event.start.dateTime);
        if (eventDay.isSame(date, 'day')) {
          const block = eventTimeBlock(event);
          schedule[bus] = {[block] : event}
        }
      })
    });
    return schedule;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};

