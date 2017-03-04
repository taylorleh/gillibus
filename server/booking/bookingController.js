/**
 * Created by taylor on 3/4/17.
 */

const utils = require('../helpers/stripe');
let booking = {};


booking.purchaseCharter = (request, response) => {
  const token = request.body.stripeToken;
  const amount = request.body.amount;

  if (!token || !amount) {
    return response.status(401).end('<h1>not authorized</h1>');
  }

  utils.createPurchaseWithToken(token, amount)
    .then(result => {
      return response.status(200).end('<h1>Success!</h1>');
    })
    .catch(error => {
      return response.status(501).json(error);
    });

};




module.exports = booking;

