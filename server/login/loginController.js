/**
 * Created by taylor on 3/22/17.
 */

  // let Users = require('../collections/users');
let models = require('../models');
let bcrypt = require('bcrypt-nodejs');


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

exports.loginAdmin = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    res.status(401).end('must define pass and user');
  }


  models.Users.findOne({ where: { username: username } })
    .then(instance => {
      if(instance) {
        return instance.checkPassword(password);
      }else {
        Promise.reject('does not exists');
      }

    })
    .then(authenticated => {
      console.log('going to return');
      res.json(authenticated);
    })
    .catch(error => {
      res.status(401).json(error);
    })

  // exports.throwIfUserExists(username)
  //   .then(instance => {
  //     instance.checkPassword(password);
  //
  //   })
  //   .catch(error => {
  //     res.status(401).json(error);
  //   });

  // models.Users.findOne({ username: username })
  //   .then(user => {
  //     return user.verifyPassword(password, user.get('hash'), (err, result) => {
  //       if (err) {
  //         res.json(err);
  //       }
  //       res.json(result);
  //     })
  //   })
  //   .catch(error => {
  //     res.status(401).json(error);
  //   })

};

