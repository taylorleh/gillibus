/**
 * Created by taylor on 2/7/17.
 */
let utils = require('./utils/auth');
// let passport = require('passport');
// let session = require('express-session');

module.exports = function(app, express) {
  let calendarRouter = express.Router();
  let bookingRouter = express.Router();
  let authRouter = express.Router();

  calendarRouter.use(function(req, res, next) {
    let tokenExists = utils.doesTokenExist();
    if (!tokenExists) {
      utils.initCalendarToken(app);
    }
    next();


  });


  // app.use(session({
  //   secret: process.env.SESSION_SECRET,
  //   resave: false,
  //   saveUninitialized: true
  // }));
  // app.use(passport.initialize());
  // app.use(passport.session());



  app.use('/api/v1/calendar', calendarRouter);
  require('./calendar/calendarRoutes')(calendarRouter);

  app.use('/api/v1/booking', bookingRouter);
  require('./booking/bookingRoutes')(bookingRouter);

  app.use('/api/v1/admin', authRouter);
  require('./login/loginRoutes')(authRouter);

};
