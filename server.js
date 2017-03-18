require('dotenv').config();
const express = require('express');

// CONFIG
const port = process.env.PORT || 3000;

// MIDDLEWARE
const sslRedirect = require('heroku-ssl-redirect');
const bodyParser = require('body-parser');
const auth = require('./server/utils/auth');
const morgan = require('morgan');

//INSTANCE
let app = express();

// SETUP
app.set('PRIVATE_KEY', auth.serializeKey(process.env.PRIVATE_KEY));
app.use(sslRedirect());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());


app.listen(port);

require('./server/middleware')(app, express);
