var sslRedirect = require('heroku-ssl-redirect');
var express = require('express');
var app = express();

app.use(sslRedirect());
app.use(express.static(__dirname + '/client'));

module.exports = app;
