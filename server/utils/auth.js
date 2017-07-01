/**
 * Created by taylor on 2/7/17.
 */
let google = require('googleapis');

let jwtClient;
let utils = {};

utils.getAuthToken = function() {
  return jwtClient;
};

utils.doesTokenExist = function() {
  return !!jwtClient;
};

utils.initCalendarToken = function(app) {
  jwtClient = new google.auth.JWT(
    process.env.CLIENT_EMAIL,
    null,
    app.get('PRIVATE_KEY'),
    ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/analytics.readonly'],
    null
  );
};

utils.serializeKey = function(key) {
  let out = '';
  key.replace( /\\n/g, " " ).split( " " ).map(function(seq, ind, ar) {
    out += seq;
    if(ind > 1 && ind < (ar.length-4)) {
      out+= '\n';
    } else {
      out += " ";
    }
  });
  return out;
};

module.exports = utils;

