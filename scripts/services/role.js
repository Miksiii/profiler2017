(function() {

  'use strict'

  /**
   * The factory provides possible roles to the user
   * 
   * @module profilerApp
   * @factory Role
   */
  angular.module('profilerApp')
    .factory('Role', function () {

      var userRoles = ['admin', 'user'];

      return {

        /**
         * Provides possible user roles
         * 
         * @return {Array} - roles
         */
        getUserRoles: function() {
          return userRoles;
        }
      };
      
    });

})();