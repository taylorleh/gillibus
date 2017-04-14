/**
 * Created by taylor on 4/12/17.
 */

let driversModel = require('../models/driversModel');
let _ = require('lodash');

/**
 * a driver callback for currently active drivers
 *
 * @callback driversCallback
 * @param {Object} buses hash
 */


/**
 *
 * @param {driversCallback} cb
 */
exports.sendClientOnlineDrivers = function(cb) {
  // console.log('CLIENT LOADED AND REQUESTING ONLINE DRIVERS', JSON.stringify(driversModel.getOnlineDrivers()))
  cb(_.toArray(driversModel.getOnlineDrivers()));
};
