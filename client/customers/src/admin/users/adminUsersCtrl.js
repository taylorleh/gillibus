/**
 * Created by taylor on 4/21/17.
 */

let moduleName = 'gillibus.admin.users';
class AdminUsers {

  constructor($scope, $state, adminPortalService, $uibModal) {
    this.adminPortalService = adminPortalService;
    this.$uibModal = $uibModal;
    this.$scope = $scope;
    this.users = [];
    this.newEmail = '';

    adminPortalService.getAdminUsers()
      .then(this.adminUsersHandler.bind(this));
  }

  //  --------------- RESPONSE HANDLERS ----------------

  adminUsersHandler(response) {
    this.users = response.data.users;
  }

  // --------------- ACTIONS --------------------------

  addNewAdminUser(email) {
    this.modalInstance.close();
    this.adminPortalService.requestNewUserToken(email);
  }

  cancel() {
    this.modalInstance.close();
  }


  openNewUserModal() {

    let modalInstance = this.$uibModal.open({
      templateUrl: 'admin/partials/newUserPtl.html',
      size: 'sm',
      scope: this.$scope
    });

    this.modalInstance = modalInstance;

    modalInstance.result.then(function(results) {
    });

  }


}
AdminUsers.$inject = ['$scope', '$state', 'adminPortalService', '$uibModal'];

angular.module(moduleName, []).controller('AdminUsersCtrl', AdminUsers);
export default moduleName
