/**
 * Created by taylor on 3/30/17.
 */


let jwt = require('jsonwebtoken');

let tokenCheck = function (req, res, next) {
  'use strict';
  let token = req.body.token || req.query.token || req.headers.authorization;
  if (token) {
    jwt.verify(token, req.app.locals.secret, function (err, decoded) {
      if (err) {
        res.status(403).json({
          error: err
        });
      }
      next();
    });
  }
};

module.exports = tokenCheck;
