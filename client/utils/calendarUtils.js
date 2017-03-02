/**
 * Created by taylor on 3/1/17.
 */
import moment from 'moment';
let calendarUtils = {};


calendarUtils.daysOfMonthHash = () => {
  let daysInMonth = moment().daysInMonth();

  return Array.apply(null, Array(daysInMonth)).reduce((memo, _, ind) => {
    let targetDate = moment().startOf('day').date(ind+1).toDate();
    memo[targetDate] = {morning: null, evening: null};
    return memo;
  }, {});

};


export default calendarUtils;

