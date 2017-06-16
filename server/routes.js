/**
 * Created by taylor on 5/18/17.
 */

const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const auth = require('./helpers/auth');


module.exports = function(app) {


  const jwtCheck = (req, res, next) => {
    const token = req.cookies['X-Access-Token'];
    if(token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          console.log('\n \n----> ERROR');
          res.redirect(301, '/admin');
        } else {
          console.log('\n \n----> TOKEN VALID', decoded);
          next();
        }
      });
    }
  };


  // TODO - VUE CUSTOMER PORTAL
  app.get('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '../client/vcustomers/dist/index.html'))
  });

  // app.get(/^\/(?!portal|static|api).*/, (req, res, next) => {
  //   res.sendFile(path.resolve(__dirname, '../client/vcustomers/dist/index.html'))
  // });
  //
  //
  // app.get(['/portal*'],auth.tokenCheck, (req, res, next) => {
  //   res.clearCookie('X-Access-Token');
  //   res.sendFile(path.resolve(__dirname, '../client/vue-admin/dist/index.html'));
  // })

};
