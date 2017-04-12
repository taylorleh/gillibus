/**
 * Created by taylor on 3/22/17.
 */

let db = require('../db/config');
let User = require('../models/user');


let Users = db.Collection.extend({
  model: User
});


module.exports = new Users();

