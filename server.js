require('dotenv').config();
const app = require('./server-config');
const express = require('express');

const port = process.env.PORT || 3000;

app.listen(port);

require('./server/middleware')(app, express);
