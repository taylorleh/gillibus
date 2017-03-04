/**
 * Created by Taylor Lehman on 12/28/16.
 */
import angular from 'npm/angular';
let moduleName = 'gillibus.service.viewport';


  // .service('viewPort', ['$window',function ($window) {
  //   return {
  //     getViewportSize: () => {
  //       let screenWidth = $window.innerWidth;
  //       let size = 'lg';
  //       if (screenWidth < 768) {
  //         size = 'xs'
  //       } else if (screenWidth < 992) {
  //         size = 'sm';
  //       } else if(screenWidth < 1200) {
  //         size = 'md';
  //       }
  //       return size;
  //     },
  //
  //
  //
  //   }
  //
  // }]);

class ViewportService {
  constructor($window) {
    this.$window = $window;
  }

  getViewportSize() {
    let screenWidth = this.$window.innerWidth;
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

  isMobile() {
    return this.getViewportSize() === 'xs';
  }

  isDesktop() {
    let breakpoint = this.getViewportSize();
    return  breakpoint !== 'xs' && breakpoint !== 'sm';
  }

}

ViewportService.$inject = ['$window'];

angular.module(moduleName, []).service('viewportService', ViewportService);

export default moduleName
