require('dotenv').config();
const path = require('path');
const express = require('express');
const expressSession = require('express-session');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
let models = require('./server/models');

// CONFIG
const port = process.env.PORT || 3000;

// SOCKETS
require('./server/sockets/socketController')(io);


// MIDDLEWARE
const sslRedirect = require('heroku-ssl-redirect');
const bodyParser = require('body-parser');
const auth = require('./server/utils/auth');
const morgan = require('morgan');


// // ROUTES
// require('./server/routes')(app);
app.use(expressSession(
  {
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    maxAge: 100,
    cookie: { maxAge: 6000}
  })
);

//INSTANCE

app.get('/', (req, res) => {
  // console.log('NEW ONE \n \n =====> \n', req.session);
  res.sendFile(path.resolve(__dirname, 'client/vcustomers/dist/index.html'))
})

// SETUP
app.set('PRIVATE_KEY', auth.serializeKey(process.env.PRIVATE_KEY));
app.use(sslRedirect());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/client/vcustomers/dist')); // TODO - THIS IS STATIC VUE-CUSTOMER
// app.use(express.static(__dirname + '/client/customers/dist'));
app.use(express.static(__dirname + '/client/vue-admin/dist'));
app.use(express.static(__dirname + '/sockjs-node'));
// app.use(express.static(__dirname + '/node_modules'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));

app.disable('x-powered-by');
app.use(flash());

require('./server/middleware')(app, express);

// ROUTES
require('./server/routes')(app);

models.sequelize.sync().then(() => {
  http.listen(port, () => {
    console.log(`Listening on port ${http.address().port}`);
  });
});
