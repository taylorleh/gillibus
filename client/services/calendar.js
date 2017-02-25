import angular from 'npm/angular';
let moduleName = 'gillibus.service.calendar';
const HTTP = new WeakMap();
const mock = {"data":{"kind":"calendar#events","etag":"\"p33oa5kcvj29d40g\"","summary":"Charters","description":"","updated":"2017-02-15T13:18:24.838Z","timeZone":"America/Los_Angeles","accessRole":"freeBusyReader","defaultReminders":[],"nextSyncToken":"CPCi0Z-YktICEPCi0Z-YktICGAo=","items":[{"kind":"calendar#event","etag":"\"2973075836358000\"","id":"ovc4qvhgah9qdh2c8gs68c4as0","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=b3ZjNHF2aGdhaDlxZGgyYzhnczY4YzRhczAgZ2lsbGlidXMuaGVyb2t1YXBwLmNvbV8za29haWxkYzBhdHI0ZDAzMGk4N20wNHB0c0Bn","created":"2017-02-08T05:54:46.000Z","updated":"2017-02-08T07:11:58.179Z","summary":"Private Event","description":"Anna's birthday charter","creator":{"email":"taylor@gillibus.herokuapp.com"},"organizer":{"email":"gillibus.herokuapp.com_3koaildc0atr4d030i87m04pts@group.calendar.google.com","displayName":"TEST","self":true},"start":{"dateTime":"2017-02-08T10:00:00-08:00"},"end":{"dateTime":"2017-02-08T16:00:00-08:00"},"visibility":"public","iCalUID":"ovc4qvhgah9qdh2c8gs68c4as0@google.com","sequence":1,"hangoutLink":"https://plus.google.com/hangouts/_/gillibus.herokuapp.com/sample-event?hcei…Gk4N20wNHB0c0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t.ovc4qvhgah9qdh2c8gs68c4as0"},{"kind":"calendar#event","etag":"\"2973075924962000\"","id":"0lvloq6jhktud94j2sc3v9n3dg","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=MGx2bG9xNmpoa3R1ZDk0ajJzYzN2OW4zZGcgZ2lsbGlidXMuaGVyb2t1YXBwLmNvbV8za29haWxkYzBhdHI0ZDAzMGk4N20wNHB0c0Bn","created":"2017-02-08T06:50:31.000Z","updated":"2017-02-08T07:12:42.481Z","summary":"Private Event","description":"Franks prom charter","creator":{"email":"taylor@gillibus.herokuapp.com"},"organizer":{"email":"gillibus.herokuapp.com_3koaildc0atr4d030i87m04pts@group.calendar.google.com","displayName":"TEST","self":true},"start":{"dateTime":"2017-02-10T10:00:00-08:00"},"end":{"dateTime":"2017-02-10T16:00:00-08:00"},"visibility":"public","iCalUID":"0lvloq6jhktud94j2sc3v9n3dg@google.com","sequence":1,"hangoutLink":"https://plus.google.com/hangouts/_/gillibus.herokuapp.com/anna-event?hceid=…Gk4N20wNHB0c0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t.0lvloq6jhktud94j2sc3v9n3dg"},{"kind":"calendar#event","etag":"\"2973076157256000\"","id":"8gkvnfhqk2pmkta1tdpnsrcr6c","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=OGdrdm5maHFrMnBta3RhMXRkcG5zcmNyNmMgZ2lsbGlidXMuaGVyb2t1YXBwLmNvbV8za29haWxkYzBhdHI0ZDAzMGk4N20wNHB0c0Bn","created":"2017-02-08T07:13:58.000Z","updated":"2017-02-08T07:14:38.628Z","summary":"Private Event","description":"Rachel's charter to L.A.","creator":{"email":"taylor@gillibus.herokuapp.com"},"organizer":{"email":"gillibus.herokuapp.com_3koaildc0atr4d030i87m04pts@group.calendar.google.com","displayName":"Charters","self":true},"start":{"dateTime":"2017-02-09T10:00:00-08:00"},"end":{"dateTime":"2017-02-09T16:00:00-08:00"},"visibility":"public","iCalUID":"8gkvnfhqk2pmkta1tdpnsrcr6c@google.com","sequence":1,"hangoutLink":"https://plus.google.com/hangouts/_/gillibus.herokuapp.com/private-event?hce…Gk4N20wNHB0c0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t.8gkvnfhqk2pmkta1tdpnsrcr6c"},{"kind":"calendar#event","etag":"\"2973240076150000\"","id":"9qcem9fmip6umoap44b699fojo","status":"confirmed","htmlLink":"https://www.google.com/calendar/event?eid=OXFjZW05Zm1pcDZ1bW9hcDQ0YjY5OWZvam8gZ2lsbGlidXMuaGVyb2t1YXBwLmNvbV8za29haWxkYzBhdHI0ZDAzMGk4N20wNHB0c0Bn","created":"2017-02-08T06:41:01.000Z","updated":"2017-02-09T06:00:38.075Z","summary":"Private Event","description":"John's charter to Lake Tohoe","creator":{"email":"taylor@gillibus.herokuapp.com"},"organizer":{"email":"gillibus.herokuapp.com_3koaildc0atr4d030i87m04pts@group.calendar.google.com","displayName":"TEST","self":true},"start":{"dateTime":"2017-02-09T18:00:00-08:00"},"end":{"dateTime":"2017-02-10T02:00:00-08:00"},"visibility":"public","iCalUID":"9qcem9fmip6umoap44b699fojo@google.com","sequence":1,"hangoutLink":"https://plus.google.com/hangouts/_/gillibus.herokuapp.com/evening-event?hce…Gk4N20wNHB0c0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t.9qcem9fmip6umoap44b699fojo"}]},"status":200,"config":{"method":"POST","transformRequest":[null],"transformResponse":[null],"data":{"calendar":"CHARTER_CALENDAR"},"url":"https://www.taylorlehmanjs.com/calendar/events","headers":{"Accept":"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"}},"statusText":"OK"};


class CalendarService {
  constructor($http) {
    HTTP.set(this, $http);
  }

  getEventsForCalendar(calendar) {
    if(mock) {
      return Promise.resolve(mock);
    }
    let host = document.location.origin;
    return HTTP.get(this).post({
      data: {calendar: calendar},
      url:[host,'calendar/events'].join('/')
    });
  }

  static calendarFactory($http){
    return new CalendarService($http);
  }

}



CalendarService.calendarFactory.$inject = ['$http'];
//
// angular.module(moduleName, [])
//   .factory('CalendarService', function ($http) {
//     var host = document.location.origin;
//     var service = {};
//
//     service.getEventsForCalendar = function(calendar) {
//       return $http({
//         method: 'POST',
//         data: {calendar: calendar},
//         url:[host,'calendar/events'].join('/')
//       });
//     };
//
//     return service;
//
//   });

angular.module(moduleName, []).factory('CalendarService', CalendarService.calendarFactory);

export default moduleName
