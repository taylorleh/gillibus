/**
 * Created by taylor on 2/7/17.
 */

let google = require('googleapis');
let cal = google.calendar('v3');
let utils = require('../utils/auth');

module.exports = {

  getEventsForCalendar: (req, res) =>{
    let token = utils.getAuthToken();
    let calendarId = process.env[req.body.calendar];

    if (!calendarId) {
      res.status(400).json({ message: 'need to specify a claendar' });
      return;
    }

    token.authorize(function(err, tokens) {
      let calParams = {
        auth: token,
        calendarId: calendarId
      };

      cal.events.list(calParams, function(err, resp) {
        if (err) {
          console.log('error \n', err);
          res.status(401).json(err);
        }

        if (resp) {
          res.status(200).json(resp);
        }
      });

    });
  },

  getFreeBusy: (req, res) =>{
    let token = utils.getAuthToken();

    token.authorize((err, tokens)=> {
      let calParams = {
        auth: token,
        resource: {
          timeMin: req.body.timeMin,
          timeMax: req.body.timeMax,
          items: [{
            id: process.env.CHARTER_CALENDAR
          }]
        }
      };

      cal.freebusy.query(calParams, (err, resp) =>{
        if(err) {
          console.log('error \n', err);
          res.status(401).json(err);
        } else {
          res.status(200).json(resp);
        }
      });
    });

  }

};
