require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// const db = require('./server/db/config'); // bookshelf
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

//INSTANCE

// SETUP
app.set('PRIVATE_KEY', auth.serializeKey(process.env.PRIVATE_KEY));
app.use(sslRedirect());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/sockjs-node'));
app.use(express.static(__dirname + '/node_modules'));
app.use(bodyParser.json());


require('./server/middleware')(app, express);

models.sequelize.sync().then(() => {

  http.listen(port, () => {
    console.log(`Listening on port ${http.address().port}`);
  });


});


