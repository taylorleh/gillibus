const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

console.log(__dirname);
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/client'));



module.exports = app;
