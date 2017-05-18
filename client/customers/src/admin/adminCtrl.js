/**
 * Created by taylor on 4/20/17.
 */
let moduleName = 'gillibus.admin.base';

class AdminBase {

  constructor($scope, $state) {
    angular.element('.front-nav').hide();
  }
}
AdminBase.$inject = ['$scope', '$state'];

angular.module(moduleName, []).controller('AdminBaseCtrl', AdminBase);
export default moduleName;
