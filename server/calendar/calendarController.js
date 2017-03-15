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


  createCalendarEvent: (req, res) => {
    let token = utils.getAuthToken();
    let eventData = req.body.eventData;
    let calendarId = process.env[req.body.calendar];

    if (!calendarId) {
      res.status(400).json({ message: 'need to specify a claendar' });
      return;
    }


    token.authorize(function(err, tokens) {
      let calParams = {
        auth: token,
        calendarId: calendarId,
        resource: eventData
      };

      cal.events.insert(calParams, function(err, resp) {
        if (err) {
          console.log('error \n', err);
          res.status(401).json(err);
        }

        if (resp) {
          res.status(200).json(resp);
        }
      });

    })

  },

  getFreeBusy: (req, res) =>{
    let token = utils.getAuthToken();

    token.authorize((err, tokens)=> {
      let calParams = {
        auth: token,
        resource: {
          timeMin: req.body.start,
          timeMax: req.body.end,
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

  },


  getBusAgendasFromDate: (req, res) => {
    let token = utils.getAuthToken();
    let reqData = req.body;

    let calendarId = process.env[reqData.calendar];
    let timeMin = reqData.timeMin;
    let timeMax = reqData.timeMax;

    if (!calendarId) {
      res.status(400).json({ message: 'need to specify a claendar' });
      return;
    }

    token.authorize(function(err, tokens) {
      let calParams = {
        auth: token,
        calendarId: calendarId,
        timeMin: timeMin,
        timeMax: timeMax
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


  }

};
