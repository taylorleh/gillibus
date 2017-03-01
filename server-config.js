const express = require('express');
const sslRedirect = require('heroku-ssl-redirect');
const bodyParser = require('body-parser');
const auth = require('./server/utils/auth');
const morgan = require('morgan');
let app = express();


app.set('PRIVATE_KEY', auth.serializeKey(process.env.PRIVATE_KEY));

app.use(sslRedirect());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

module.exports = app;
