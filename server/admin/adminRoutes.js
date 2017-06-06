/**
 * Created by taylor on 3/22/17.
 */

let loginController = require('./adminController');
let passwordless = require('passwordless');
const recaptcha = require('../providers/captcha');
const auth = require('../helpers/auth');

module.exports = function(router) {

  /**
   * BASE ROUTE: /api/v1/admin
   */



  router.route('/login')
    .post(loginController.loginAdmin);

  router.route('/users')
    .post(auth.tokenCheck,loginController.getAdminUsers);

  router.post('/complete/registration', recaptcha.middleware.verify, function(req, res) {
    if(req.recaptcha.error) {
      req.flash('error', 'Validation Error!');
      res.redirect('/password');
    } else {
      loginController.createUser(req, res);
    }
  });


  router.post('/sendtoken',
    passwordless.requestToken(
      function(user, delivery, callback) {
        callback(null, user);
      },
      function(req, res) {
        res.render('sent');
      })
  );

};
