require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
let models = require('./server/models');

// CONFIG
const port = process.env.PORT || 3000;

// SOCKETS
require('./server/sockets/socketController')(io);

require('./server/middleware')(app, express);

// ROUTES
require('./server/routes')(app);

models.sequelize.sync().then(() => {
  http.listen(port, () => {
    console.log(`Listening on port ${http.address().port}`);
  });
});
