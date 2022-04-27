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
exports.onClientRequestAllBuses = function(cb) {
  // console.log('CLIENT LOADED AND REQUESTING ONLINE DRIVERS', JSON.stringify(driversModel.getOnlineDrivers()))
  driversModel.debug('client request connections');
  let currentConnections = driversModel.getAllConnections();
  let out = [];
  let connections = Object.keys(currentConnections).forEach(con => {
    let mod = currentConnections[con];
    if(mod.bus && mod.loc) {
      out.push(currentConnections[con].loc);
    } else {
      console.error('COULD NOT PROPERLY RETURN BUSES TO CLIENT', mod);
    }
  });
  cb(out);
};
