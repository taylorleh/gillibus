/**
 * Created by taylor on 3/22/17.
 */

let loginController = require('./adminController');

let passwordless = require('passwordless');
let MySQLStore = require('passwordless-mysql');
let send = require('../email');
let host = 'http://localhost:3000';





module.exports = function(router) {

  // --------------- passwordless



  // const nodemailer = require('nodemailer');

  // passwordless.init(new MySQLStore(process.env.GDATABASE_URL));
  //
  // // Setup of Passwordless
  // passwordless.addDelivery(function(tokenToSend, uidToSend, recipient, callback) {
  //   // Send out token
  //   console.log('INSIDE ADD DELIVERY', tokenToSend, ' ui d', uidToSend, '  recipient ', recipient);
  //
  //   send({
  //     text: 'Hello!\nYou can now access your account here: '
  //     + host + '?token=' + tokenToSend + '&uid=' + encodeURIComponent(uidToSend),
  //     to: recipient,
  //     subject: 'Token for ' + host
  //   }, function(err, message) {
  //     if (err) {
  //       console.log(err);
  //     }
  //     callback(err)
  //   });
  //
  //   // smtpServer.send({
  //   //   text: 'Hello!\nYou can now access your account here: '
  //   //   + host + '?token=' + tokenToSend + '&uid=' + encodeURIComponent(uidToSend),
  //   //   from: yourEmail,
  //   //   to: recipient,
  //   //   subject: 'Token for ' + host
  //   // }, function(err, message) {
  //   //   if (err) {
  //   //     console.log(err);
  //   //   }
  //   //   callback(err);
  //   // });
  // });




  // -----------------------------




  /**
   * BASE ROUTE: /api/v1/admin
   */

  router.use((req, res, next) => {
    next();
  });


  router.route('/login')
    .post(loginController.loginAdmin);

  router.route('/users')
    .post(loginController.getAdminUsers);

  router.route('/complete/registration')
    .post(loginController.createUser);

  router.post('/sendtoken',
    passwordless.requestToken(
      function(user, delivery, callback) {
        callback(null, user);
      },
      function(req, res) {
        res.render('sent');
      })
  )


};
