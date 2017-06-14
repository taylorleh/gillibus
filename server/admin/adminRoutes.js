/**
 * Created by taylor on 3/22/17.
 */

let loginController = require('./adminController');
let passwordless = require('passwordless');
const recaptcha = require('../providers/captcha');
const models = require('../models');
const auth = require('../helpers/auth');

module.exports = function(router) {

  /**
   * BASE ROUTE: /api/v1/admin
   */

  const userIdCallback = (user, delivery, callback) => {
    models.Users.findOne({ where : { username: user } })
      .then(instance => {
        if (instance) {
          callback('error', null);
        } else {
          callback(null, user);
        }
      })
      .catch(error => {
        callback('error', null);
      })

  };

  router.route('/login')
    .post(loginController.loginAdmin);

  router.route('/users')
    .post(auth.tokenCheck, loginController.getAdminUsers);

  router.post('/complete/registration', recaptcha.middleware.verify, function(req, res) {
    if (req.recaptcha.error) {
      req.flash('error', 'Validation Error!');
      res.redirect('/password');
    } else {
      loginController.createUser(req, res);
    }
  });


  router.post('/sendtoken', passwordless.requestToken(userIdCallback), function(req, res) {
    res.status(201).json({msg: `Please have ${req.body.user} check their email for signup instructions`});
  })


};
