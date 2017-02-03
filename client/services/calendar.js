/**
 * Created by taylor on 2/2/17.
 */
/**
 * Created by taylor on 1/31/17.
 */
angular.module('gillibus.service.calendar', [])
  .factory('CalendarService', function ($http) {
    const KEY = "AIzaSyB9ZobUZjLzuTKbJEL_EBuA2nR0Zjj6YXo";
    return {
      // https://maps.googleapis.com/maps/api/directions/json?origin=Brooklyn&destination=Queens&departure_time=1343641500&mode=transit&key=YOUR_API_KEY



      // {
      //   origin: LatLng | String | google.maps.Place,
      //     destination: LatLng | String | google.maps.Place,
      //   travelMode: TravelMode,
      //   transitOptions: TransitOptions,
      //   drivingOptions: DrivingOptions,
      //   unitSystem: UnitSystem,
      //   waypoints[]: DirectionsWaypoint,
      //   optimizeWaypoints: Boolean,
      //   provideRouteAlternatives: Boolean,
      //   avoidHighways: Boolean,
      //   avoidTolls: Boolean,
      //   region: String
      // }

      getDirections: function (db, table) {
        var route = `https://maps.googleapis.com/maps/api/directions/json?origin=SanFrancisco&destination=Oakland&mode=walking&key=${KEY}`;
        return $http({
          method: 'GET',
          url: route
        });
      }
    };
  })

