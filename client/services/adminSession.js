/**
 * Created by taylor on 3/30/17.
 */

import angular from 'npm/angular';
let moduleName = 'gillibus.service.adminSessionService';

class AdminSession {

  get userRole() {
    return this._userRole;
  }

  set userRole(value) {
    this._userRole = value;
  }

  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
  }

  get userId() {
    return this._userId;
  }
  set userId(value) {
    this._userId = value;
  }

  constructor($http) {
    this.$http = $http;
    this._userId = null;
    this._id = null;
    this._userRole = null;
  }


  create(sessionId, userId, userRole) {
    this._id = sessionId;
    this._userId = userId;
    this._userRole = userRole;
  }

  destroy() {
    this._id = null;
    this._userId = null;
    this._userRole = null;
  }

}
AdminSession.$inject = ['$http'];


angular.module(moduleName, []).service('adminSession', AdminSession);
export default moduleName
