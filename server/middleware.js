/**
 * Created by taylor on 2/7/17.
 */
let utils = require('./utils/auth');

module.exports = function (app, express) {

  let calendarRouter = express.Router();
  calendarRouter.use(function(req, res, next) {
    let tokenExists = utils.doesTokenExist();
    if(!tokenExists) {
      utils.initCalendarToken(app);
    }
    next();
  });

  app.use('/calendar', calendarRouter);
  require('./calendar/calendarRoutes')(calendarRouter);

};