(function() {

  'use strict'

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