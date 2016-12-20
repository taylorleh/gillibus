angular.module('gillibus.pricing', [])
  .controller('PricingController', ['$scope', function($scope) {
    console.log('LOADED Pricing CONTROLLER');

    $scope.gbSelectOptions = {
      optList: [
        '10:00am',
        '11:00am',
        '12:00pm',
        '1:00pm',
        '2:00pm',
        '3:00pm',
        '4:00pm',
        '5:00pm',
        '6:00pm',
        '7:00pm',
        '8:00pm',
        '9:00pm',
        '10:00pm'
      ],
      placeHolder:'Depart'


  };

  }]);
