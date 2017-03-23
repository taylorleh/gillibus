/**
 * Created by taylor on 3/22/17.
 */

let db = require('../db/config');

let User = db.Model.extend({
  tableName:'tbl_admin_users'
});


module.exports = User;
