/**
 * Created by taylor on 3/23/17.
 */

"use strict";

let fs = require("fs");
let path = require("path");
let Sequelize = require("sequelize");
require('sequelize-isunique-validator')(Sequelize);


/** @namespace process.env.DATABASE_URL */
let sequelize = new Sequelize(process.env.GDATABASE_DB, process.env.GDATABASE_USER, process.env.GDATABASE_PASSWORD, {
  host: process.env.GDATABASE_HOST,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 1,
    idle: 10000
  }
});

let db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
