angular.module('gillibus.service.calendar', [])
  .factory('CalendarService', function ($http) {
    const KEY = "AIzaSyB9ZobUZjLzuTKbJEL_EBuA2nR0Zjj6YXo";
    return {

      getDirections: function (db, table) {
        var route = `https://maps.googleapis.com/maps/api/directions/json?origin=SanFrancisco&destination=Oakland&mode=walking&key=${KEY}`;
        return $http({
          method: 'GET',
          url: route
        });
      }
    };
  })

