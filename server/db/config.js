/**
 * Created by taylor on 3/22/17.
 */

const Bookshelf = require('bookshelf');
const path = require('path');

let knex = require('knex')({
  client: 'mysql',
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'heroku_1d9fc5aa14a912c',
    charset: 'utf8'
  }
});


let db = Bookshelf(knex);

module.exports = db;
