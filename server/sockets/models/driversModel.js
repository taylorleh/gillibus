/**
 * Created by taylor on 4/12/17.
 */

/**
 * driver object where keys are bus and value is last transmitted location from driver
 * @type {{}}
 */
let latestDriversLocation = {};
let driverConnections = {};
let _ = require('lodash');

/**
 * given an object and property, returns the object without the key
 *
 * @param {Object} collection
 * @param {String} property - property to be removed
 * @return {Object}
 *
 */
function removePropfromObj(collection, property) {
  let copy = _.clone(collection);
  Object.keys(copy).forEach(busName => {
    delete copy[busName][property];
  });
  return copy;
}


/**
 * given a collection of objects, filters and returns object with supplied property
 * @param collection
 * @param property
 */
function returnObjectByProperty(collection, property, value) {
  let found = null;
  Object.keys(collection).forEach(item => {
    if(collection[item][property] === value) {
      found = collection[item];
    }
  });

  return found;
}


// TODO - below is deprecated. remove soon
exports.getOnlineDrivers = function() {
  return removePropfromObj(latestDriversLocation, 'id');
};


/**
 * Returns all active connections
 *
 * @returns {Object}
 */
exports.getAllConnections = function() {
  return driverConnections;
};


// /**
//  * removes a driver from cache by the supplies socket it
//  *
//  * @param {String} id - socket id of the driver
//  */
// exports.removeDriverById = function(id) {
//   let item = returnObjectByProperty(latestDriversLocation, 'id', id);
//   let busName = null;
//   if(item) {
//
//     busName = item.bus;
//     delete latestDriversLocation[busName];
//   } else {
//     console.warn('TRIED REMOVING DRIVER BUT COULD NOT FIND INSTANCE', id, JSON.stringify(latestDriversLocation));
//   }
//   return busName;
// };


/**
 *
 * @param bus
 * @param locationObj
 * @param {Object} locationObj.location - locations details
 * @param {String} locationObj.bus - bus name
 * @param {String} locationObj.id - socket id ref
 * @param {String} id - drivers socket id
 */
exports.cacheDriversLatestPosition = function(bus, locationObj, id) {
  console.error('DO NOT INVOKE cahceDriversLatestPosition');
  // if (driverConnections[id]) {
  //   locationObj.id = id;
  //   latestDriversLocation[bus] = locationObj;
  // } else {
  //   console.error('attempt to cache driver last location failed!!!');
  // }
};

exports.updateDriversLocation = function(id, locationObj) {
  driverConnections[id] && (driverConnections[id].loc = locationObj);
};


exports.addDriver = function(id, socket) {
  driverConnections[id] = { sock: socket };
};


/**
 * Removes a driver's connection by id
 *
 * @param id - driver socket id
 *
 */
exports.removeDriver = function(id) {
  let old = driverConnections[id];
  if(driverConnections[id]) {
    let old = _.cloneDeep(driverConnections[id]);
    delete driverConnections[id];
    return old;
  }
  return null;
};


/**
 * Checks if the driver is already registered
 *
 * @param {String} id - socket id
 * @returns {Boolean}
 *
 */
exports.isDriverRegistered = function(id) {
  return !!driverConnections[id];
};


/**
 * Adds bus property to driver's connection
 *
 * @param id
 * @param {String} bus - the driver's bus
 *
 */
exports.bindBusToDriverSocket = function(id, bus) {
  driverConnections[id] && (driverConnections[id].bus = bus);
  let x = 1;
};


exports.debug = function(msg) {
  console.log(`\n \n------------ DEBUG ${msg ? ': '+msg : ''} -------- \n`);
  Object.keys(driverConnections).forEach((con, ind) => {
    if(ind > 0) {
      console.log('\n ******* \n');
    }
    // console.log('\n \n');
    console.log(`id : ${con}`);
    let mod = driverConnections[con];
    if(mod.bus) {
      console.log(`bus: ${mod.bus}`);
    }
    if(mod.loc) {
      console.log(`loc: ${JSON.stringify(mod.loc)}`);
    }
  });
  console.log(`\n \n---------- END DEBUG-------- \n \n \n \n`);
};
