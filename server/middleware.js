/**
 * Created by taylor on 2/7/17.
 */
let utils = require('./utils/auth');
let path = require('path');
let expressSession = require('express-session');
let passwordless = require('passwordless');
let MySQLStore = require('passwordless-mysql');
let send = require('./email');
let host = 'https://taylorlehmanjs.com/register';

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



  passwordless.init(new MySQLStore(process.env.GDATABASE_URL));
  passwordless.addDelivery(function(tokenToSend, uidToSend, recipient, callback) {

    send({
      text: 'Hello!\nYou can now access your account here: '
      + host + '?token=' + tokenToSend + '&uid=' + encodeURIComponent(uidToSend),
      to: recipient,
      subject: 'Token for ' + host
    }, function(err, message) {
      if (err) {
        console.log(err);
      }
      callback(err)
    });
  }, { ttl: 1000*60*10 });

  app.use(expressSession({secret: process.env.SESSION_SECRET, saveUninitialized: false, resave: false}));

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(passwordless.sessionSupport());
  app.use(passwordless.acceptToken({ successRedirect: '/password' }));



  app.get('/register', passwordless.restricted());
  app.get('/password', passwordless.restricted(), function(req, res) {
    res.render('register', { user: req.user });
  });

  // ----------------------------------- ROUTES ------------------------------------------------

  app.use('/api/v1/calendar', calendarRouter);
  require('./calendar/calendarRoutes')(calendarRouter);

  app.use('/api/v1/booking', bookingRouter);
  require('./booking/bookingRoutes')(bookingRouter);

  app.use('/api/v1/admin', authRouter);
  require('./admin/adminRoutes')(authRouter);

};
