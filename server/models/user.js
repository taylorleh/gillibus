/**
 * Created by taylor on 3/22/17.
 */

"use strict";

const bcrypt = require('bcrypt-nodejs');
const _ = require('lodash');

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
        let instance = this;
        return new Promise((resolve, reject) => {
          bcrypt.compare(pass, storedHash, function(err, result) {
            if(err || !result) {
              reject({ message: 'Incorrect login credentials'});
            } else {
              resolve({
                result: result,
                instance: instance
              });
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

