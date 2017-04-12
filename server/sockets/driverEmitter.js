/**
 * Created by taylor on 4/11/17.
 */

let driverController = {};


/**
 * Emits to client that token is expired
 *
 * @param socket - a driver socket
 * @param error - the error object
 *
 */
driverController.sendExpirationUnauthorization = function(socket, error) {
  socket.emit('unauthorized', { data : error })
};


/**
 * Emits to customer channel the drivers' location
 *
 * @param socket - the customer channel
 * @param data - the bus drivers' location
 *
 */
driverController.sendDriverLocation = function(socket, data) {
  console.log('token is valid', data);
  socket.emit('bus location', data);
};


module.exports = driverController;
