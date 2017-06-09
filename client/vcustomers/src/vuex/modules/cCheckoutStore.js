/**
 * Created by taylor on 6/8/17.
 */
import {
  dayDurations,
  nightDurations,
  timeBlocks,
  getDisabledBlockBlock,
  busChoices,
  firstFreeBusInList
} from '../../util/checkoutUtils';

const state = {
  busChoices: [],
  selectedBus: '',

  timeBlocks: [],
  selectedBlock: '',

  durations: [],
  selectedDuration: ''
};

const mutations = {
  'SET_CHOSEN_BLOCK' (state, block) {
    state.selectedBlock = block;
  },
  'SET_TIME_BLOCKS' (state, blocks) {
    state.timeBlocks = blocks;
  },

  'SET_DURATIONS' (state, durations) {
    state.durations = durations;
  },
  'SET_CHOSEN_DURATION' (state, duration) {
    state.selectedDuration = duration;
  },
  'SET_BUS_CHOICES' (state, choices) {
    state.busChoices = choices;
  },
  'SET_CHOSEN_BUS' (state, bus) {
    state.selectedBus = bus;
  }
};

const actions = {

  /**
   * Dispatches new selected bus to the store
   *
   * @param commit
   * @param {String} bus - selected bus name
   */
  setBus({ commit }, bus) {
    commit('SET_CHOSEN_BUS', bus);
  },

  setBusChoices({ commit, getters }, { day, block }) {
    const busesAvailability = getters.busAvailability(day);
    const defaultBus = firstFreeBusInList(busesAvailability, block);
    const daySchedule = busChoices(busesAvailability, block);
    commit('SET_BUS_CHOICES', daySchedule);
    commit('SET_CHOSEN_BUS', `CHARTER_${defaultBus}`);
  },


  /**
   * Entry point for form initialization
   *
   * @param context
   * @param {Date} day - date object used to retrieve availability
   */
  setBlocks(context, day) {
    const availability = context.getters.dayAvailability(day);
    const defaultBlock = availability.bookDay ? 'Day' : 'Night';
    const blockRestriction = getDisabledBlockBlock(availability);

    context.commit('SET_TIME_BLOCKS', timeBlocks(blockRestriction));
    context.commit('SET_CHOSEN_BLOCK', availability.bookDay ? 'Day' : 'Night');
    context.dispatch('setDurations', defaultBlock);
    context.dispatch('setBusChoices', {day, block: defaultBlock });
  },


  /**
   * Should be triggered after styled select change for time block. Commits
   * the new time block and dispatches setDurations which will update
   * the durations if needed
   *
   * @param commit
   * @param dispatch
   * @param {('Day'|'Night')} block - time block to be committed
   *
   */
  changeBlock({ commit, dispatch, state }, {block, day }) {
    commit('SET_CHOSEN_BLOCK', block);
    dispatch('setDurations', block);
    dispatch('setBusChoices', {block, day })
  },


  /**
   * Commits refined durations based on the time block
   *
   * @param commit
   * @param {('Day'|'Night')} block - the time block
   *
   */
  setDurations({ commit }, block) {
    commit('SET_DURATIONS', block === 'Day' ? dayDurations(): nightDurations());
    commit('SET_CHOSEN_DURATION', block === 'Day' ? 6 : 4);
  }
};

const getters = {
  selectedDuration: state => state.selectedDuration,
  durations: state => state.durations,

  selectedBlock: state => state.selectedBlock,
  timeBlocks: state => state.timeBlocks,

  selectedBus: state => state.selectedBus,
  busChoices: state => state.busChoices

};

export default {
  state,
  getters,
  mutations,
  actions
};
