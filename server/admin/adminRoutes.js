/**
 * Created by taylor on 3/22/17.
 */

let loginController = require('./adminController');
let passwordless = require('passwordless');

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
  );

};
