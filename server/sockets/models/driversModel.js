/**
 * Created by taylor on 4/12/17.
 */

/**
 * driver object where keys are bus and value is last transmitted location from driver
 * @type {{}}
 */
let latestDriversLocation = {};
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


exports.getOnlineDrivers = function() {
  return removePropfromObj(latestDriversLocation, 'id');
};


/**
 * removes a driver from cache by the supplies socket it
 *
 * @param {String} id - socket id of the driver
 */
exports.removeDriverById = function(id) {
  let item = returnObjectByProperty(latestDriversLocation, 'id', id);
  let busName = null;
  if(item) {

    busName = item.bus;
    delete latestDriversLocation[busName];
  } else {
    console.warn('TRIED REMOVING DRIVER BUT COULD NOT FIND INSTANCE', id, JSON.stringify(latestDriversLocation));
  }
  return busName;
};


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
  locationObj.id = id;
  latestDriversLocation[bus] = locationObj;
};

