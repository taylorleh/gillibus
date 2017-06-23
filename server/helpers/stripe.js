/**
 * Created by taylor on 3/4/17.
 */

const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET);

const validators = {
  name(val) {
    console.log(`validating name with val ${val}`);
    return true;
  },

  phone(val) {
    console.log(`validating phone with val ${val}`);
    return true;
  },

  bus(val) {
    console.log(`validating bus with val ${val}`);
    return true;
  },

  time_block(val) {
    console.log(`validating time_block with val ${val}`);
    return true;
  },

  duration(val) {
    console.log(`validating duration with val ${val}`);
    return true;
  },

  book_date(val) {
    console.log(`validating book_date with val ${val}`);
    return true;
  }
};


module.exports = {

  createPurchaseWithToken: (token, amount, metadata) => {

    let chargeReq = {
      amount,
      metadata,
      currency: "usd",
      description: "Example charge",
      source: token
    };

    return new Promise((resolve, reject) => {
      stripe.charges.create(chargeReq, (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });

    });
  },

  validMetaData(data) {
    console.log(`beging validation on metadata ${JSON.stringify(data)}`);
    return Object.keys(data).every(key => {
      return key in validators && validators[key](data[key]);
    })
  },


  /**
   * Queries the Stripe balance API to return details about account
   * balances and pending charges, etc
   *
   * @param {Object} options - options object
   * @param {Function} cb - callback function
   *
   */
  getStripeAccountBalance(cb) {
    stripe.balance.retrieve((err, balance) => {
      cb(err, balance);
    })
  },

  getMonthlyCharges: (options, cb) => {
    stripe.charges.list(options, (err, charges) => {
      cb(err, charges);
    })
  }
};
