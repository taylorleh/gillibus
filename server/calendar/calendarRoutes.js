/**
 * Created by taylor on 2/7/17.
 */

var calendarController = require('./calendarController');

module.exports = function(router) {

  router.route('/oauth')
    .get(calendarController.getClientToken);

  router.route('/events')
    .post(calendarController.getEventsForCalendar);
};

