(function() {

  'use strict';

  angular.module('profilerApp').
    controller('DashboardCtrl', function(Auth, User, Role, $scope, $location, $routeParams) {

      /**
       * Returns users array
       * 
       * @return {Array} - json list of currently registered users
       */
      $scope.getUsers = function() {
        return usersList;
      };

      /**
       * Returns array of possible user roles 
       * 
       * @return {[Array]} - user roles
       */
      $scope.getUserRoles = function() {
        return Role.getUserRoles();
      };

      /**
       * Displays specific user by changing the location path to 
       * match the view user route (dashboard/users/:id)
       * 
       * @param  {Object} userToView - User to display 
       */
      $scope.viewUserDetails = function(userToView) {
        $location.path('dashboard/users/' + userToView.id);
      };

      /**
       * Checks the form validation, prepares user details for an update and 
       * calls the User factory method editUser
       * 
       * @param  {Boolean} isValid - the form validation
       */
      $scope.updateUser = function(isValid) {
        if (isValid) {
          $scope.editableUser.dateModified = new Date();
          User.editUser($scope.editableUser);
          $scope.editResponse = 'Profile is successfully updated.';
        }
      };

      /**
       * Restricts user with no admin permission to access the 'edit user route' and 
       * eventually edit other users
       */
      var onInitEditViewCheckUserPermission = function() {
        if($location.path() === '/dashboard/users/edit/' + $routeParams.id) {
          if ($routeParams.id !== $scope.user.id && $scope.user.role === 'user') {
            $location.path('/dashboard/users/edit/' + $scope.user.id);
          }
        }
      };

      /**
       * Grabs the 'view user' route parameters (id of the user that needs to be shown)
       * 
       * @return {Object} - User founded by it's unique id
       */
      var getUserDetailsWithURLParams = function() {
        var userId = $routeParams.id;
        return User.getUserWithSessionId(userId);
      };

      /**
       * Calls a factory method to destroy user session and logout user
       */
      $scope.logout = function() {
        Auth.logout();
      };

      $scope.user = Auth.currentlyActiveUser();
      $scope.editableUser = User.getUserWithSessionId($routeParams.id);
      var usersList = User.getUsersJsonList();
      $scope.userToView = getUserDetailsWithURLParams();
      onInitEditViewCheckUserPermission();

    });

})();
