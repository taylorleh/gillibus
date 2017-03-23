/**
 * Created by taylor on 3/22/17.
 */

let Users = require('../collections/users');
let User = require('../models/user');
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


exports.createUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401).end('must define pass and user');
  }

  userExists(username)
    .then(() => {

      let salt = bcrypt.genSaltSync();
      let hash = bcrypt.hashSync(password, salt);

      Users.create({
          username: username,
          hash: hash,
          salt: salt
        })
        .then(response => {
          res.json(response);
        })
        .catch(error => {
          res.json(error);
        });
    })
    .catch(err => {
      res.json(err);
    });
};

exports.loginAdmin = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    res.status(401).end('must define pass and user');
  }

  Users
    .query({ where: { username: username } })
    .fetchOne({ require: true })
    .then(model => {
      return model.get('hash');
    })
    .then(hash => {
      bcrypt.compare(password, hash, (error, result) => {
        res.json(result);
      })
    })
    .catch(error => {
      res.status(401).json(error.message);
    })


};

