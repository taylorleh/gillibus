/**
 * Created by taylor on 2/7/17.
 */
let utils = require('./utils/auth');

module.exports = function (app, express) {
  let calendarRouter = express.Router();
  let bookingRouter = express.Router();

  calendarRouter.use(function(req, res, next) {
    let tokenExists = utils.doesTokenExist();
    if(!tokenExists) {
      utils.initCalendarToken(app);
    }
    next();


  });

  app.use('/api/v1/calendar', calendarRouter);
  require('./calendar/calendarRoutes')(calendarRouter);

  app.use('/api/v1/booking', bookingRouter);
  require('./booking/bookingRoutes')(bookingRouter);

};
