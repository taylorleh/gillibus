/**
 * Created by taylor on 3/18/17.
 */
let driverController = require('./driverEmitter');
let customerController = require('./socketControllers/customerEmitter');
let customers = {};
let drivers = {};
let simpleDrivers = {};
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

let flattenSimpleDrivers = (drivers) => {
  return Object.keys(drivers).map(driverId => {
    return drivers[driverId];
  });
};


module.exports = (io)  => {


  let driverChannel = io.of('/driver');
  let customerChannel = io.of('/customer');

  driverChannel.use(socketioJwt.authorize({
    secret: process.env.JWT_SECRET,
    handshake: true
  }));

  driverChannel.on('connection', socket => {
    // if(len(drivers) === 0) {
    //   sendStaticToGroup(customers,'yes buses', customerChannel)
    // }
    let driverId = socket.id;

    if(!drivers[socket.id]) {
      drivers[socket.id] = socket;
    }

    socket.on('driver chooses bus', busname => {
      simpleDrivers[socket.id] = busname;
      driverController.sendClientBusesAvailable(customerChannel);
    });

    socket.on('disconnect', () => {
      let driversBus = simpleDrivers[socket.id];
      delete drivers[socket.id];
      delete simpleDrivers[socket.id];
      driverController.sendDriverHasLeft(customerChannel, driversBus, driverId);
      (len(drivers) === 0) && sendStaticToGroup(customers, 'no buses', customerChannel)
    });

    socket.on('driver location', locations => {
      let driverToken = socket.handshake.query.token;
      checkTokenExpiration(SECRET, driverToken, err => {
        driverController.sendExpirationUnauthorization(socket, err);
      }, data => {
        driverController.sendDriverLocation(customerChannel, locations, driverId);
      })
    });
  });


  customerChannel.on('connection', socket => {
    customers[socket.id] = socket;

    if(len(drivers) === 0) {
      socket.emit('no buses');
    }

    socket.on('disconnect', client => {

    });

    socket.on('what buses are online', (cb) => {
      customerController.sendClientOnlineDrivers(cb);
    });

  });


};
