/**
 * Created by taylor on 2/7/17.
 */
const utils = require('./utils/auth');
const path = require('path');
const passwordless = require('passwordless');
const recaptcha = require('./providers/captcha');
const sslRedirect = require('heroku-ssl-redirect');
const bodyParser = require('body-parser');
const auth = require('./utils/auth');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

module.exports = function(app, express) {
  let calendarRouter = express.Router();
  let bookingRouter = express.Router();
  let authRouter = express.Router();

  // SETUP
  app.set('PRIVATE_KEY', auth.serializeKey(process.env.PRIVATE_KEY));
  app.use(sslRedirect());
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../client/vcustomers/dist')); // TODO - THIS IS STATIC VUE-CUSTOMER
  app.use(express.static(__dirname + '/../client/vue-admin/dist'));
  app.use(express.static(__dirname + '/sockjs-node'));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extended: false}));
  app.disable('x-powered-by');
  app.use(flash());
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  require('./config')(app, express); // configurable middleware


  app.get('/register', passwordless.restricted());

  app.get('/password', passwordless.restricted(), recaptcha.middleware.render,  function(req, res) {
    res.render('register', { user: req.user, captcha:req.recaptcha, messages: req.flash('error')  });
  });


  // ----------------------------------- ROUTES ------------------------------------------------

  app.use('/api/v1/calendar', calendarRouter);
  require('./calendar/calendarRoutes')(calendarRouter, app);

  app.use('/api/v1/booking', bookingRouter);
  require('./booking/bookingRoutes')(bookingRouter);

  app.use('/api/v1/admin', authRouter);
  require('./admin/adminRoutes')(authRouter);

};
