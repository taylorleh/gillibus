/**
 * Created by taylor on 3/30/17.
 */

import angular from 'npm/angular';
let moduleName = 'gillibus.constant.userRoles';

let USER_ROLES = {
  all: '*',
  admin: 'ADMIN',
  editor: 'editor',
  GUEST: 'GUEST'
};

angular.module(moduleName, []).constant('USER_ROLES', USER_ROLES);
export default moduleName;
