/**
 * Created by taylor on 3/23/17.
 */


  // const jwt = require('jwt-simple');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

module.exports = {
  errorLogger: function(error, req, res, next) {
    // log the error then send it to the next middleware in
    // middleware.js

    console.error(error.stack);
    next(error);
  },
  errorHandler: function(error, req, res, next) {
    // send error message to client
    // message for gracefull error handling on app
    res.send(500, { error: error.message });
  },

  decode: function(req, res, next) {
    var token = req.headers['x-access-token'];
    var user;

    if (!token) {
      return res.send(403); // send forbidden if a token is not provided
    }

    try {
      // decode token and attach user to the request
      // for use inside our controllers
      user = jwt.decode(token, 'secret');
      req.user = user;
      next();
    } catch (error) {
      return next(error);
    }

  },
  tokenCheck: (req, res, next) => {
    const token = req.get('Authorization');

    if(token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          console.log('\n \n----> ERROR');
          if(req.method === 'GET') {

            res.redirect(301, '/admin');
          } else if(req.method === 'POST') {
            res.status(401).json('Unauthorized');
          }
        } else {
          next();
        }
      });
    } else {
      if(req.method === 'GET') {
        res.redirect(301, '/admin');
      } else if(req.method === 'POST') {
        res.status(401).json('Unauthorized');
      }
    }
  },

  validateTokenQuery: (req, res, next) => {
    const token = req.query && req.query.token;
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          if(req.method === 'GET') {
            res.redirect(301, '/admin');
          }
        } else {
          next();
        }
      });

    } else {
      res.status(401).end();
    }

  }

};
