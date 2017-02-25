/**
 * Created by Taylor Lehman on 12/28/16.
 */
import angular from 'npm/angular';

export default angular.module('gillibus.service.viewport', [])
  .service('viewPort', ['$window',function ($window) {
    return {
      getViewportSize: () => {
        let screenWidth = $window.innerWidth;
        let size = 'lg';
        if (screenWidth < 768) {
          size = 'xs'
        } else if (screenWidth < 992) {
          size = 'sm';
        } else if(screenWidth < 1200) {
          size = 'md';
        }
        return size;

      }

    }

  }]);
