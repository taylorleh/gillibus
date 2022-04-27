/**
 * Created by taylor on 6/7/17.
 */
import moment from 'moment';

/**
 * Returns if an event is considered booked in a day or night slot
 * @param {Object} event - google cal event obj
 * @returns {('DAY'|'NIGHT')}
 */
export const eventTimeBlock = (event) => {
  if (event.start) {
    let start = moment(event.start.dateTime);
    if(start.hour() <= 18) {
      return 'DAY';
    }
    return 'NIGHT';
  } else {
    console.error('Could not convert event object into date');
  }
};
