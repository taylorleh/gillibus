/**
 * Created by taylor on 3/22/17.
 */

let models = require('../models');
let jwt = require('jsonwebtoken');
let stripeUtils = require('../helpers/stripe');
const moment = require('moment');
let google = require('googleapis');
let gapi = google.analytics('v3');
let utils = require('../utils/auth');


exports.throwIfUserExists = (username) => {

  return models.Users.findOne({ where: { username: username } })
    .then(instance => {
      if (instance) {
        return Promise.reject('exists');
      }
      return Promise.resolve(instance);
    });
};


exports.createUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401).end('must define pass and user');
  }

  exports.throwIfUserExists(username)
    .then(() => {
      return models.Users.create({ username: username, password: password })
    })
    .then(result => {
      res.redirect('/admin');
    })
    .catch(error => {
      res.status(401).json(error);

    });
};


/**
 * Returns account balances including pending charges and fullfilled from
 * Stripe account
 *
 * @param req
 * @param res
 *
 */
exports.getStripeBalance = (req, res) => {

  stripeUtils.getStripeAccountBalance((err, balance) => {
    if (err) {
      res.status(403).json(err);
    } else {
      res.status(200).json(balance);
    }
  })
};


/**
 * returns charges specified with a `from` unix timestamp
 *
 * @param req
 * @param res
 * @param next
 */
exports.getStripeCharges = (req, res, next) => {
  let fromStamp = req.body.begin;
  if (!fromStamp) {
    res.status(403).end('Please supply a begin period');
    return
  }


  stripeUtils.getMonthlyCharges({ created: { gte: fromStamp } }, (err, results) => {
    if (err) {
      res.status(403).json(err);
    } else {
      res.status(200).json(results);
    }
  })
};

/**
 * Admin login - checks password against hashed password and returns
 * a json webtoken to be used on subsequent requests
 *
 * @param req
 * @param res
 * @param next
 *
 */
exports.loginAdmin = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;


  if (!username || !password) {
    res.status(401).end('must define pass and user');
  }


  models.Users.findOne({ where: { username: username } })
    .then(instance => {
      if (instance) {
        return instance.checkPassword(password);
      }
      else {
        return Promise.reject({ message: 'User not found!' });
      }

    })
    .then(response => {
      let claims = response.instance.get();
      let secret = process.env.JWT_SECRET;

      let token = jwt.sign(claims, secret, {
        expiresIn: '5m'
      });


      res.json({
        success: true,
        message: 'Admin Authenticated',
        token: token,
        roles: 'ADMIN',
        id: claims.id
      });

    })
    .catch(error => {
      res.status(403).json({ success: false, message: error.message });
    })

};


/**
 * Retrieves all the admin users
 *
 * @param req
 * @param res
 * @returns {object}
 *
 */
exports.getAdminUsers = (req, res) => {
  models.Users.findAll({
      attributes: { exclude: ['hash', 'salt'] }
    })
    .then(response => {
      res.json({
        users: response
      })
    })
    .catch(error => {
      res.status(400).end(error);
    })
};


exports.getWeeklyUsers = (req, res) => {
  let token = utils.getAuthToken();

  token.authorize((err, tokens) => {
    let request = {
      auth: token,
      ids: process.env.GAPI_VIEW_ID,
      metrics: ['rt:activeUsers'],
      dimensions: ['rt:pagePath']
    };

    gapi.data.realtime.get(request, (err, data) => {
      if (err) {
        res.json(err);
      } else {
        res.json(data);
      }
    })
  })
};
