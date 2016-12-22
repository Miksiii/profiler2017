(function() {

  'use strict'

  angular.module('profilerApp')
    .factory('Auth', function (User, $location) {

      var userLoggedIn = {
        id: null,
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        dateRegistered: new Date(),
        dateModified: null,
        role: null
      };

      return {

        /**
         * Makes User authentication and returns User Object 
         * 
         * @param  {string} email    - email from login form
         * @param  {string} password - password from login form
         * 
         * @return {Object} - User attempted to login
         */
        authenticate: function(email, password) {

          var userAttemptedToLogin = User.getUserWithLoginCredentials(email, password);

          if ( userAttemptedToLogin !== null ) {
            localStorage.setItem('TcProfilerApp2017_usersessionid', userAttemptedToLogin.id);

            if (userAttemptedToLogin.role === 'admin') {
              $location.path('/dashboard/users');
            } else {
              $location.path('/dashboard');
            }

            userLoggedIn = userAttemptedToLogin;
            return true;
          }

          return false;
        },

        /**
         * Destroys User session by removing the user session id from the localStorage
         * and redirects to default path
         */
        logout: function() {
          localStorage.removeItem('TcProfilerApp2017_usersessionid');
          $location.path('/');
        },

        /**
         * Returns currently active User 
         *
         * @return {Object} - currently active user
         */
        currentlyActiveUser: function() {
          var userSessionId = localStorage.getItem('TcProfilerApp2017_usersessionid');

          if ( userSessionId !== null ) {
            userLoggedIn = User.getUserWithSessionId(userSessionId);
          } else {
            userLoggedIn = null;
          }

          return userLoggedIn;
        },

        /**
         * Checks whether the current User is authenticated or not
         * 
         * @return {Boolean} - authenticated or not
         */
        isAuthenticated: function() {
          return (this.currentlyActiveUser() === null) ? false : true;
        },

        /**
         * Checks wheter the current user has admin role 
         * 
         * @return {Boolean} - admin or user role
         */
        isAdministrator: function() {
          return (this.currentlyActiveUser().role === 'admin') ? true : false;
        }
      };

    });

})();