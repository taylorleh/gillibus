/**
 * Created by taylor on 4/26/17.
 */

let send = require('gmail-send')({
  user: 'taylor@gillibus.herokuapp.com',
  pass: process.env.GAPPPASS,
  to:   'taylor@gillibus.herokuapp.com',
  from:'admin@taylorlehmanjs.com',
  subject: 'Welcome!',
  text:    'Thanks for signing up!'
});

module.exports = send;
