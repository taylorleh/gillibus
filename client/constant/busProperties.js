/**
 * Created by taylor on 3/9/17.
 */

import angular from 'npm/angular';
let moduleName = 'gillibus.constant.busProperties';


let busProperties = {
  blocks: [
    {
      id: 0,
      name: 'Day'
    },
    {
      id: 1,
      name: 'Night'
    }
  ],
  hours: [
    {
      label: 4
    },
    {
      label: 5
    },
    {
      label: 6
    },
    {
      label: 7
    },
    {
      label: 8
    }
  ],
  buses: [
    {
      name: 'Gillibus',
      capacity: 28,
      dayRate: 185,
      nightRate: 200,
      durationDayMin: 6,
      durationNightMin: 4,
      additionalNight: 175,
      operating: true,
      colorId: 9 // blue
    },
    {
      name: 'Charlie',
      capacity: 28,
      dayRate: 185,
      nightRate: 200,
      durationDayMin: 6,
      durationNightMin: 4,
      additionalNight: 175,
      operating: true,
      colorId: 10 // green
    },
    {
      name: 'G3',
      capacity: 33,
      dayRate: 195,
      nightRate: 225,
      durationDayMin: 6,
      durationNightMin: 4,
      additionalNight: 175,
      operating: true,
      colorId: 5 // yellow
    },
    {
      name: 'Starship',
      capacity: 38,
      dayRate: 225,
      nightRate: 250,
      durationDayMin: 6,
      durationNightMin: 4,
      additionalNight: 195,
      operating: true,
      colorId: 11 // red
    }
  ]

};

angular.module(moduleName, []).constant('busProperties', busProperties);

export default moduleName;

