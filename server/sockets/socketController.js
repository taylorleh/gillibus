/**
 * Created by taylor on 3/18/17.
 */
let driverController = require('./driverEmitter');
let customers = {};
let drivers = {};
let socketioJwt = require('socketio-jwt');
let jwt = require('jsonwebtoken');
let SECRET = process.env.JWT_SECRET;


let len = (obj) => {
  return Object.keys(obj).length;
};

let sendStaticToGroup = (group, message, channel) => {
  channel.emit(message);
};


/**
 * Verify if the token is valid
 *
 * @function checkTokenExpiration
 * @param secret - token secret
 * @param token - the token to verify
 * @param fail - fail callback
 * @param success - success callback
 *
 */
let checkTokenExpiration = (secret, token, fail, success) => {
  jwt.verify(token, secret, (err, decoded) => {
    if(!err) {
      success(decoded);
    } else {
      fail(err);
    }
  })
};

let getDriverObjectById = (id) => {
  if(id) {
    if(id in drivers) {
      return drivers[id];
    } else {
      console.error('driver object not found');
    }
  } else {
    console.error('must pass driver id');
  }
  return null;
};


// set authorization for socket.io
// io.sockets
//   .on('connection', socketioJwt.authorize({
//     secret: 'your secret or public key',
//     timeout: 15000 // 15 seconds to send the authentication message
//   })).on('authenticated', function(socket) {
//   //this socket is authenticated, we are good to handle more events from it.
//   console.log('hello! ' + socket.decoded_token.name);
// });


module.exports = (io)  => {

  // io.sockets.on('connection', socketioJwt.authorize({
  //   secret: process.env.JWT_SECRET,
  //   timeout: 15000
  // })).on('authenticated', socket => {
  //   console.log(`Hello ${socket.decoded_token.name}`);
  // })

  let driverChannel = io.of('/driver');
  let customerChannel = io.of('/customer');

  driverChannel.use(socketioJwt.authorize({
    secret: process.env.JWT_SECRET,
    handshake: true
  }));

  driverChannel.on('connection', socket => {
    if(len(drivers) === 0) {
      sendStaticToGroup(customers,'yes buses', customerChannel)
    }

    if(!drivers[socket.id]) {
      drivers[socket.id] = socket;
    }

    socket.on('disconnect', () => {
      delete drivers[socket.id];
      (len(drivers) === 0) && sendStaticToGroup(customers, 'no buses', customerChannel)
    });

    socket.on('driver location', locations => {
      let driverToken = socket.handshake.query.token;
      checkTokenExpiration(SECRET, driverToken, err => {
        driverController.sendExpirationUnauthorization(socket, err);
      }, data => {
        driverController.sendDriverLocation(customerChannel, locations);
      })
    });
  });


  customerChannel.on('connection', client => {
    customers[client.id] = client;

    if(len(drivers) === 0) {
      client.emit('no buses');
    }

    client.on('disconnect', client => {

    });
  });


};
