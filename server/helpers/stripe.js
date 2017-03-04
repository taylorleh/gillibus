/**
 * Created by taylor on 3/4/17.
 */

const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET);


module.exports = {

  createPurchaseWithToken: (token, amount, meta) => {

    let chargeReq = {
      amount: amount,
      currency: "usd",
      description: "Example charge",
      source: token,
    };

    return new Promise((resolve, reject) => {
      stripe.charges.create(chargeReq, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });

    });

  }
};
