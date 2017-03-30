/**
 * Created by taylor on 3/22/17.
 */


const bcrypt = require('bcrypt-nodejs');
const _ = require('lodash');


//
// let ModelBase = require('bookshelf-modelbase')(require('../db/config'));
// let Promise  = require('bluebird');
// let bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
//
// let User = ModelBase.extend({
//   tableName: 'tbl_admin_users',
//
//   virtuals: {
//     password: {
//       get: function() {
//         return this.pass;
//       },
//       set: function(value) {
//         this.pass = value;
//       }
//     }
//
//   },
//
//   outputVirtuals: false,
//
//   initialize: function() {
//     this.on('saving', this._hashUser.bind(this));
//
//   },
//
//   verifyPassword: function(password, hash, done) {
//     bcrypt.compare(password, hash , function(err, result) {
//       return done(err, result);
//     });
//   },
//
//   _hashUser: function() {
//     let salt = bcrypt.genSaltSync();
//     let hash = bcrypt.hashSync(this.get('password'), salt);
//     this.set('hash', hash);
//     this.set('salt', salt);
//   }
// });


"use strict";

module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        isUnique: sequelize.validateIsUnique('username', 'This username is already used.')
      }
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: { type: DataTypes.VIRTUAL }

  }, {
    instanceMethods: {
      toJSON: function() {
        let copy = _.clone(this.dataValues);
        delete copy.password;
        return copy;
      },
      checkPassword: function(pass) {
        let storedHash = this.get('hash');
        return new Promise((resolve, reject) => {
          bcrypt.compare(pass, storedHash, function(err, result) {
            if(err) {
              reject(err);
            } else {
              resolve(result);
            }
          })
        });

      }

    },
    hooks: {
      beforeValidate: (user, fn) => {
        let salt = bcrypt.genSaltSync();
        let hash = bcrypt.hashSync(user.get('password'), salt);
        user.set('salt', salt);
        user.set('hash', hash);
      }
    }
  });
};

