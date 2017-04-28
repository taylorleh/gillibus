/**
 * Created by taylor on 3/22/17.
 */

let loginController = require('./adminController');
let passwordless = require('passwordless');
const recaptcha = require('../providers/captcha');

module.exports = function(router) {

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
