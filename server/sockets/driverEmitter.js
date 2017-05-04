/**
 * Created by taylor on 4/11/17.
 */

let driverController = {};
let driversModel = require('./models/driversModel');
let _ = require('lodash');



/**
 * Emits to client that token is expired
 *
 * @param socket - a driver socket
 * @param error - the error object
 *
 */
driverController.sendExpirationUnauthorization = function(socket, error) {
  socket.emit('unauthorized', { data: error })
};


// /**
//  * Emits to customer channel the drivers' location
//  *
//  * @param socket - the customer channel
//  * @param locationObj - the bus drivers' location
//  * @param {String} id - socket id for driver
//  */
// driverController.sendDriverLocation = function(socket, locationObj, id) {
//   let locationWithoutId = _.clone(locationObj);
//   driversModel.cacheDriversLatestPosition(locationObj.bus, locationObj, id);
//   socket.emit('bus location', locationWithoutId);
// };

/**
 * Adds a driver's location to their respective connection
 *
 * @param socket
 * @param {Object} locationObj
 *
 */
driverController.onDriverLocation = function(socket, locationObj) {
  if(driversModel.isDriverRegistered(socket.id)) {
    driversModel.updateDriversLocation(socket.id, locationObj);
  } else {
    console.warn('Tried ADDING LOCATION but driver\'s connection is not found!');
  }
};


driverController.sendClientBusesAvailable = function(socket) {
  socket.emit('yes buses');
};


/**
 * emits to customers that driver has left while also removing driver from cache
 *
 * @param socket - customer socket channel
 * @param busName - the bus name
 * @param sockId - socket id of driver
 */
driverController.sendDriverHasLeft = function(socket, busName, sockId) {
  console.error('DO NOT INVOKE')
  // let leavingDriverBusName = driversModel.removeDriverById(sockId);
  // socket.emit('driver left', leavingDriverBusName);
};


/**
 * Checks if driver has already been registered, and if not
 * registers a new driver
 *
 * @param socket
 * @returns None
 *
 */
driverController.onConnect = function(socket) {
  let id = socket.id;
  if(!driversModel.isDriverRegistered(id)) {
    driversModel.addDriver(id, socket);
    driversModel.debug('connect');
  } else {
    console.warn('Tried ADDING driver but id already exists!');
  }
};


driverController.onDisconnect = function(socket, customerChannel) {
  let id = socket.id;
  if(driversModel.isDriverRegistered(socket.id)) {
    let oldConnection = driversModel.removeDriver(id);
    customerChannel.emit('driver left', oldConnection.bus);
    driversModel.debug('disconnect');
  } else {
    console.warn('Tried REMOVING driver but driver\'s socket was not found!');
  }
};


/**
 * Binds the bus name to the drivers socket
 *
 * @param socket
 * @param {String} bus - the driver's chosen bus
 *
 */
driverController.onDriverChoseBus = function(socket, bus) {
  if(driversModel.isDriverRegistered(socket.id)) {
    driversModel.bindBusToDriverSocket(socket.id, bus);
  } else {
    console.warn('Tried BINDING BUS NAME to driver connection bus connection did not exist');
  }
};

module.exports = driverController;
