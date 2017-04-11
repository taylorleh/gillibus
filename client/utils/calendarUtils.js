/**
 * Created by taylor on 3/1/17.
 */
import moment from 'moment';
let calendarUtils = {};

let disableBlocksWhenAllBusesBlocked = (checkDates, datesHash, busNames) => {
  checkDates.forEach(date => {
    let {dateScope, dayCount, nightCount} = {dateScope: datesHash[date], dayCount: 0, nightCount: 0};
    busNames.forEach(bus => {
      !dateScope[bus].day && (dayCount += 1);
      !dateScope[bus].night && (nightCount += 1);
    });

    if(dayCount === busNames.length) {
      dateScope.day = false;
    }

    if(nightCount === busNames.length) {
      dateScope.night = false;
    }
  })

};


/**
 * Returns if an event is booked for either day or night
 *
 * @param {String} start - date string
 * @param {String} end - date string
 * @returns {String}
 *
 */
calendarUtils.bookedNightOrDay = (start, end) => {
  if (start.hour() > 14) {
    return 'night';
  }
  return 'day';
};

calendarUtils.daysOfMonthHash = (busIds) => {

  let hash = Array.apply(null, Array(42)).reduce((memo, _, ind) => {
    let targetDate = moment().startOf('day').date(ind + 1).toDate();
    let target = memo[targetDate];
    memo[targetDate] = { day: true, night: true };
    return memo;
  }, {});

  Object.keys(hash).forEach(d => {
    let ctx = hash[d];
    busIds.forEach(id => {
      ctx[id] = { day: true, night: true };
    });
  });
  return hash;
};



/**
 *
 * @param {Object[]} busesEvents - array of event data for each bus
 * @param {Object} scopeObj - date hash
 * @param {String[]} busNames - array of bus name accessors
 * @param  moment - moment object
 * @return {*}
 */
calendarUtils.applyCalendarEventsToUnified = (busesEvents, scopeObj, busNames,  moment) => {
  let eventsOnDates = [];
  busesEvents.forEach((busEvents, index) => {
    busEvents.forEach(event => {
      let {start, end} = { start: moment(event.start.dateTime), end: moment(event.end.dateTime) };
      let { eventTime, dateScope } = {
        eventTime: calendarUtils.bookedNightOrDay(start, end),
        dateScope: scopeObj[start.startOf('day').toDate()]
      };

      dateScope[busNames[index]][eventTime] = false;

      if (eventsOnDates.indexOf(start.toDate()) === -1) {
        eventsOnDates.push(start.toDate());
      }
    });
  });

  disableBlocksWhenAllBusesBlocked(eventsOnDates, scopeObj, busNames);

  return scopeObj;
};


export default calendarUtils;

