/**
 * Created by taylor on 6/14/17.
 */

const passwordless = require('passwordless');
const recaptcha = require('../providers/captcha');
const MySQLStore = require('passwordless-mysql');
const path = require('path');
const send = require('../providers');
// const host = process.env.NODE_ENV === 'production' ?
//   'https://www.taylorlehmanjs.com/register' :
//   'http://localhost:3000/register';
let expressSession = require('express-session');
const http = require('http');
const host = require('os').hostname().indexOf('Taylor') === -1 ?
  'https://www.taylorlehmanjs.com/register' :
  'http://localhost:3000/register';
const SAFE_EMAIL = host === 'https://www.taylorlehmanjs.com/register' ?
  void(0) : 'taylorlehman111@gmail.com';

module.exports = function(app, express) {

  console.log(`\n Sending email verifications to ${host} \n`);


  app.use(expressSession(
    {
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      maxAge: 100,
      cookie: { maxAge: 6000 }
    })
  );


  passwordless.init(new MySQLStore(process.env.GDATABASE_URL));
  passwordless.addDelivery(function(tokenToSend, uidToSend, recipient, callback) {

    if(SAFE_EMAIL) {
      console.log('using safe email');
      recipient = SAFE_EMAIL;
    }

    send({
      text: 'Hello!\n \nYou can now access your account and complete registration here : '
      + host + '?token=' + tokenToSend + '&uid=' + encodeURIComponent(uidToSend),
      to: recipient,
      subject: 'You\'re invited to join the Gillibus team'
    }, function(err, message) {
      if (err) {
        console.log(err);
      }
      callback(err)
    });
  }, { ttl: 1000 * 60 * 100 });


  app.use(passwordless.sessionSupport());
  app.use(passwordless.acceptToken({ successRedirect: '/password' }));

  recaptcha.init(process.env.CAPTCHA_KEY, process.env.CAPTCHA_SECRET);


};
