/**
 * Created by taylor on 3/22/17.
 */

let loginController = require('./loginController');

module.exports = function(router) {

  /**
   * BASE ROUTE: /api/v1/admin
   */

  router.use((req, res, next) => {
    next();
  });

  router.route('/create')
    .post(loginController.createUser);

  router.route('/login')
    .post(loginController.loginAdmin);


};
