/**
 * Created by taylor on 2/7/17.
 */

let calendarController = require('./calendarController');
let utils = require('../utils/auth');

module.exports = function(router, app) {


  router.use(function(req, res, next) {
    let tokenExists = utils.doesTokenExist();
    if (!tokenExists) {
      utils.initCalendarToken(app);
    }
    next();
  });

  router.route('/events')
    .post(calendarController.getEventsForCalendar);

  router.route('/events/create')
    .post(calendarController.createCalendarEvent);

  router.route('/freebusy')
    .post(calendarController.getFreeBusy);

  router.route('/bus/agenda')
    .post(calendarController.getBusAgendasFromDate);

};

