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


/**
 * Emits to customer channel the drivers' location
 *
 * @param socket - the customer channel
 * @param locationObj - the bus drivers' location
 * @param {String} id - socket id for driver
 */
driverController.sendDriverLocation = function(socket, locationObj, id) {
  let locationWithoutId = _.clone(locationObj);
  driversModel.cacheDriversLatestPosition(locationObj.bus, locationObj, id);
  socket.emit('bus location', locationWithoutId);
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
  let leavingDriverBusName = driversModel.removeDriverById(sockId);
  socket.emit('driver left', leavingDriverBusName);
};


module.exports = driverController;
