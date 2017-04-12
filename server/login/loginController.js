/**
 * Created by taylor on 3/22/17.
 */

  // let Users = require('../collections/users');
let models = require('../models');
let bcrypt = require('bcrypt-nodejs');
let jwt = require('jsonwebtoken');


let userExists = (username) => {
  return Users.query({ where: { username: username } })
    .fetchOne()
    .then(user => {
      return user === null ? Promise.resolve() : Promise.reject('user already exists');
    });
};


exports.getUsers = (req, res) => {
  Users.fetchAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.json(err)
    })
};


exports.throwIfUserExists = (username) => {

  return models.Users.findOne({ where: { username: username } })
    .then(instance => {
      if(instance) {
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
      res.json(result);
    })
    .catch(error => {
      res.status(401).json(error);
    });

};

exports.loginAdmin = (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    res.status(401).end('must define pass and user');
  }


  models.Users.findOne({ where: { username: username } })
    .then(instance => {
      if(instance) {
        return instance.checkPassword(password);
      }
      else {
        return Promise.reject({message:'User not found!'});
      }

    })
    .then(response => {
      let claims = response.instance.get();
      let secret = process.env.JWT_SECRET;

      let token = jwt.sign(claims, secret, {
        expiresIn: '3h'
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

