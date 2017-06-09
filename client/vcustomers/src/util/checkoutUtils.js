/**
 * Created by taylor on 6/8/17.
 */
import { busNames } from '../config'

/**
 * Takes a bus schedule and returns the appropriate bus
 * options object
 *
 * @param {Object} schedule
 * @returns []
 *
 */
export const busChoices = (schedule, block) => {
  return Object.keys(schedule).map(key => {
    const busEvents = schedule[key];
    return {
      text: key,
      value: `CHARTER_${key}`,
      disabled: busEvents && !!busEvents[block.toUpperCase()]
    }
  });
};

export const firstFreeBusInList = (schedule, block) => {
  return Object.keys(schedule).reduce((memo, bus) => {
    if(!schedule[bus] || !schedule[bus][block.toUpperCase()] && !memo) {
      memo = bus;
    }
    return memo;
  }, '');
};

export const dayDurations = () => {
  let durations = [];
  for(let i=4; i < 9; i++) {
    durations.push({ text: i, value: i, disabled: (i === 4 || i === 5) });
  }
  return durations;
};

export const nightDurations = () => {
  let durations = [];
  for(let i=4; i < 9; i++) {
    durations.push({ text: i, value: i, disabled: false });
  }
  return durations;
};


/**
 * Returns a new instance of day blocks. If a disabled day is passed
 * in as an argument, a disabled option will be set
 *
 * @param {('Day'|'Night')} [disableBlock] - the day to disable
 * @returns {[*,*]}
 *
 */
export const timeBlocks = (disableBlock) => {
  return [
    { text: 'Day', value: 'Day', disabled: disableBlock && 'Day' === disableBlock},
    { text: 'Night', value: 'Night', disabled: disableBlock && 'Night' === disableBlock}
  ]
};

/**
 * Parses an availibility object to check if day or night is disabled and returns
 * those keys. Otherwise nothing is returned
 *
 * @param {{bookDay: Boolean, bookNight: Boolean}} availability
 * @returns {*}
 */
export const getDisabledBlockBlock = (availability) => {
  if (!(availability.bookDay && availability.bookNight)) {
    if (!availability.bookDay) {
      return 'Day';
    } else {
      return 'Night';
    }
  }
};
