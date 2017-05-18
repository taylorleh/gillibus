/**
 * Created by taylor on 1/31/17.
 */
import angular from 'npm/angular';
export default angular.module('gillibus.service.directions', [])
  .factory('DirectionService', function ($http) {
    const KEY = "AIzaSyDs4rZOUR9C6GjW-FUifZ_kNZpnv9WjS6U";
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
