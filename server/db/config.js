/**
 * Created by taylor on 3/22/17.
 */

console.error('trying to use old DB file')

// let Bookshelf = require('bookshelf');
// const path = require('path');
//
// let knex = require('knex')({
//   client: 'mysql',
//   connection: {
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: 'heroku_1d9fc5aa14a912c',
//     charset: 'utf8'
//   }
// });
//
//
//
// knex.schema.hasTable('tbl_admin_users').then(function(exists) {
//   if (!exists) {
//     return knex.schema.createTable('tbl_admin_users', function(t) {
//       t.increments('id').primary();
//       t.string('username', 255).notNullable();
//       t.string('hash', 255).notNullable();
//       t.string('salt', 255).notNullable();
//       t.timestamps();
//       t.unique('username');
//     });
//   }
// });
//
// let db = Bookshelf(knex);
//
// // PLUGINS
// db.plugin('virtuals');
//
// module.exports = db;
