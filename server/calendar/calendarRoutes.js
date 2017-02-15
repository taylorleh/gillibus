/**
 * Created by taylor on 2/7/17.
 */

let calendarController = require('./calendarController');

module.exports = function(router) {

  router.route('/events')
    .post(calendarController.getEventsForCalendar);

  router.route('/freebusy')
    .post(calendarController.getFreeBusy);

};

