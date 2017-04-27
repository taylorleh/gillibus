/**
 * Created by taylor on 4/21/17.
 */

let moduleName = 'gillibus.admin.users';
class AdminUsers {

  constructor($scope, $state, adminPortalService) {
    angular.element('.front-nav').hide();
    this.adminPortalService = adminPortalService;

    this.users = [];

    this.newEmail = '';

    adminPortalService.getAdminUsers()
      .then(this.adminUsersHandler.bind(this));

  }

//  --------------- RESPONSE HANDLERS ----------------

  adminUsersHandler(response) {
    this.users = response.data.users;
  }

  addNewAdminUser(email) {
    this.adminPortalService.requestNewUserToken(email);
  }



}
AdminUsers.$inject = ['$scope', '$state', 'adminPortalService'];

angular.module(moduleName, []).controller('AdminUsersCtrl', AdminUsers);
export default moduleName
