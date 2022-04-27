/**
 * Created by taylor on 4/27/17.
 */

const recaptcha = require('express-recaptcha');
recaptcha.init(process.env.CAPTCHA_KEY, process.env.CAPTCHA_SECRET);

module.exports = recaptcha;
