/**
 * Created by taylor on 3/9/17.
 */

import angular from 'npm/angular';
let moduleName = 'gillibus.constant.calendarConfig';


let calendarConfig = {
  calendar: {
    height: 1000,
    editable: true,
    header: {
      left: 'month',
      center: 'title',
      right: 'today prev,next'
    },
    eventClick: {},
    eventDrop: {},
    eventResize: {}
  }
};

angular.module(moduleName, []).constant('calendarConfig', calendarConfig);

export default moduleName;

