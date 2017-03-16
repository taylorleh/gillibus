/**
 * Created by taylor on 3/1/17.
 */
import moment from 'moment';
let calendarUtils = {};


/**
 * Returns if an event is booked for either day or night
 *
 * @param {String} start - date string
 * @param {String} end - date string
 * @returns {String}
 *
 */
calendarUtils.bookedNightOrDay = (start, end) => {
  if(start.hour() > 14) {
    return 'night';
  }
  return 'day';
};

calendarUtils.daysOfMonthHash = (busIds) => {

  let hash = Array.apply(null, Array(42)).reduce((memo, _, ind) => {
    let targetDate = moment().startOf('day').date(ind+1).toDate();
    let target = memo[targetDate];
    memo[targetDate] = {day: null, night: null};
    return memo;
  }, {});

  Object.keys(hash).forEach(d => {
    let ctx = hash[d];
    busIds.forEach(id => {
      ctx[id] = {day: true, night: true};
    });
  });
  return hash;
};


// accessRole:"writer"
// defaultReminders:Array(0)
// etag:""p324evk77jvdd40g""
// items:Array(0)
// kind:"calendar#events"
// nextSyncToken:"CIjv0Oef2tICEIjv0Oef2tICGAQ="
// summary:"(Bus)-Gillibus-28"
// timeZone:"America/Los_Angeles"
// updated:"2017-03-16T05:03:56.037Z"

calendarUtils.applyCalendarEventsToUnified = (eventData, scopeObj) => {
  let busName = /(?:-)(\w*)(?:-)/i.exec(eventData.summary)[1].toUpperCase();
  eventData.items.forEach(gcalEvent => {
    let start, end;
    ({start, end} = {start: moment(gcalEvent.start.dateTime), end: moment(gcalEvent.end.dateTime)});

    let eventTime = calendarUtils.bookedNightOrDay(start, end);
    let dateScope = scopeObj[start.startOf('day').toDate()];
    dateScope[busName] = dateScope[busName] || {};
    dateScope[busName][eventTime] = false;

  });

  return scopeObj;
};


export default calendarUtils;

