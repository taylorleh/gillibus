/**
 * Created by taylor on 3/22/17.
 */

let loginController = require('./adminController');
let passwordless = require('passwordless');
const recaptcha = require('../providers/captcha');
const models = require('../models');
const auth = require('../helpers/auth');
let utils = require('../utils/auth');

module.exports = function(router, app) {

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


  router.use(function(req, res, next) {
    let tokenExists = utils.doesTokenExist();
    if (!tokenExists) {
      utils.initCalendarToken(app);
    }
    next();
  });

  router.route('/login')
    .post(loginController.loginAdmin);


  //ADMIN HOME

  router.route('/bank/charges/list')
    .post(auth.tokenCheck, loginController.getStripeCharges);

  router.route('/bank/balance/list')
    .post(auth.tokenCheck, loginController.getStripeBalance);

  router.route('/ga/visitors/list')
    .post(loginController.getWeeklyUsers);

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
