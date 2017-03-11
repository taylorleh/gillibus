/**
 * Created by taylor on 3/4/17.
 */

const bookingController = require('./bookingController');

module.exports = function(router) {

  router.route('/purchase')
    .post(bookingController.purchaseCharter);

};
