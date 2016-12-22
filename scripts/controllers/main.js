(function() {

  'use strict';

  angular.module('profilerApp').
    controller('MainCtrl', function($scope, $location, User, Auth, Role) {

      User.initializeUsers();
      $scope.isAuthenticated = Auth.isAuthenticated();
      $scope.isReadyToLogin  = User.isReadyToLogin();

      /**
       * Makes sure we update the User {Object} when login happens 
       */
      $scope.$on('$routeChangeStart', function() {
         $scope.user = Auth.currentlyActiveUser();
         console.log("dasdada" + $scope.user.email);
      });

      /**
       * Returns boolean value which tells us whether the specified route is 
       * currently active or not.
       * 
       * @param {String} route - represents specific route engaged with each 
       * nav link (for example: /register, /dashboard, /dashboard/users, etc)
       * 
       * @return {Boolean}
       */
      $scope.isRouteActive = function(route) {
        return route === $location.path();
      };

      /**
       * Checks the form validation and prepares new user to be registered 
       * by calling the registerUser function from User factory.
       * 
       * @param  {Boolean} isValid - the form validation
       */
      $scope.registerUser = function(isValid) {
        if (isValid) {

          var tmpUser = {
            id: Math.floor(Math.random() * 2000), // some fake id
            firstname: $scope.firstname,
            lastname: $scope.lastname,
            email: $scope.email,
            password: $scope.password,
            dateRegistered: new Date(),
            dateModified: null,
            role: Role.getUserRoles()[1] // 0 => admin, 1 user
          };

          User.registerUser(tmpUser);
        }
      };

      /**
       * Tries to start a new user session firstly by checking the form 
       * validation and then sending validated data to authenticate method 
       * from User factory.  
       * 
       * @param  {Boolean} isValid the form validation
       */
      $scope.loginUser = function(isValid) {
        if (isValid) {

          if (!Auth.authenticate($scope.email, $scope.password)) {
            $scope.responseLogin = 'Incorrect username/password.';
          }
          
        }
      };

    });

})();
