/**
 * Created by taylor on 2/7/17.
 */
const utils = require('./utils/auth');
const path = require('path');
const passwordless = require('passwordless');

const sslRedirect = require('heroku-ssl-redirect');
const bodyParser = require('body-parser');
const auth = require('./utils/auth');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const chokidar = require('chokidar');

const webpack = require('webpack');
const webpackConfig = require('../webpack.dev.config');
const compiler = webpack(webpackConfig);

const PRODUCTION = process.env.NODE_ENV === 'production';
const autoOpenBrowser = true;
const opn = require('opn');


module.exports = function(app, express) {
  let calendarRouter = express.Router();
  let bookingRouter = express.Router();
  let authRouter = express.Router();

  // SETUP
  app.set('PRIVATE_KEY', auth.serializeKey(process.env.PRIVATE_KEY));
  // app.use(sslRedirect());
  app.use(morgan('dev'));

  if(!PRODUCTION) {
    console.log('DEVELOPMENT Mode Set - Using dev middleware');
    // Do "hot-reloading" of express stuff on the server
    // Throw away cached modules and re-require next time
    // Ensure there's no important state in there!
    // console.log(`Watcher will be watching from ${__dirname}`);
    // const watcher = chokidar.watch(__dirname);

    // watcher.on('ready', function() {
    //   watcher.on('all', function() {
    //     console.log("Clearing /server/ module cache from server");
    //     let count = 0, totalCount = Object.keys(require.cache).length;
    //     Object.keys(require.cache).forEach(function(id) {
    //
    //       if (/[\/\\]server[\/\\]/.test(id)) {
    //         console.log(`cache id = ${id} is being deleted`);
    //         delete require.cache[id];
    //       } else {
    //         count++;
    //       }
    //     });
    //     console.log(`${count}/${totalCount}`)
    //   });
    // });

    let devMiddleware = require('webpack-dev-middleware')(compiler, {
      reload: true,
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true,
        chunks: false, // this reduces the amount of stuff I see in my terminal; configure to your needs
        'errors-only': true
      }
    });

    let hotMiddleware = require('webpack-hot-middleware')(compiler, {
      reload: true
    });

    compiler.plugin('compilation', function (compilation) {
      compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({ action: 'reload' });
        cb()
      })
    });

    app.use(require('connect-history-api-fallback')());

    app.use(devMiddleware);
    app.use(hotMiddleware);

    let _resolve;
    let readyPromise = new Promise(resolve => {
      _resolve = resolve
    });

    let uri = 'http://localhost:3000';


    devMiddleware.waitUntilValid(() => {
      console.log('> Listening at ' + process.env.PORT || 3000 + '\n');
      // when env is testing, don't need open it
      if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
      }
      _resolve()
    })


  } else {

    console.log('PRODUCTION Mode Set - serving static files');
    app.use(express.static(__dirname + '/../client/vcustomers/dist')); // TODO - THIS IS STATIC VUE-CUSTOMER
    app.use(express.static(__dirname + '/sockjs-node'));
  }





  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({extended: false}));
  app.disable('x-powered-by');
  app.use(flash());
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  require('./config')(app, express); // configurable middleware



  // ----------------------------------- ROUTES ------------------------------------------------

  app.use('/api/v1/calendar', calendarRouter);
  require('./calendar/calendarRoutes')(calendarRouter, app);

  app.use('/api/v1/booking', bookingRouter);
  require('./booking/bookingRoutes')(bookingRouter);

  app.use('/api/v1/admin', authRouter);
  require('./admin/adminRoutes')(authRouter, app);

};
