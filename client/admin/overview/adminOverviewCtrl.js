/**
 * Created by taylor on 4/20/17.
 */

let moduleName = 'gillibus.admin.overview';

class AdminOverview {

  constructor($scope, $state) {
    angular.element('.front-nav').hide();
  }

}
AdminOverview.$inject = ['$scope', '$state'];

angular.module(moduleName, []).controller('AdminOverviewCtrl', AdminOverview);
export default moduleName
