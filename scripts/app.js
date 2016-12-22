(function() {

  'use strict';

  angular.
    module('profilerApp', [
      'ngRoute', 
      'ngResource'
      ])
    .config(function($routeProvider) {

    var restrictWithoutPermission = function($location, $q, Auth) {
        var deferred = $q.defer();

        if (Auth.currentlyActiveUser() !== null) {
            deferred.resolve();
        } else {
            deferred.reject();
            $location.url('/login');
        }

        return deferred.promise;
    };

    var restrictWithPermission = function($location, $q, Auth) {
      var deferred = $q.defer();
      var user = Auth.currentlyActiveUser();

      if (Auth.currentlyActiveUser() === null) {
          deferred.resolve();
      } else {
          deferred.reject();

          if (user.role === 'admin') {
            $location.url('/dashboard/users');
          } else {
            $location.url('/dashboard');
          }

      }

      return deferred.promise;
    };

    var restrictWithoutAdminPermission = function($location, $q, Auth) {
        var deferred = $q.defer();

        if (Auth.isAdministrator()) {
            deferred.resolve();
        } else {
            deferred.reject();
            $location.url('/dashboard');
        }

        return deferred.promise;
    };

    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        activeLink: 'login',
        resolve: {isLoggedIn: restrictWithPermission}
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        activeLink: 'register', 
        resolve: {isLoggedIn: restrictWithPermission}
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard',
        resolve: {isLoggedIn: restrictWithoutPermission}
      })
      .when('/dashboard/users', {
        templateUrl: 'views/users.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard',
        resolve: {isLoggedIn: restrictWithoutPermission, isAdmin: restrictWithoutAdminPermission}
      })
      .when('/dashboard/users/:id', {
        templateUrl: 'views/user-details.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard',
        resolve: {isLoggedIn: restrictWithoutPermission, isAdmin: restrictWithoutAdminPermission}
      })
      .when('/dashboard/users/edit/:id', {
        templateUrl: 'views/edit-user-details.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard',
        resolve: {isLoggedIn: restrictWithoutPermission}
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl',
        controllerAs: 'logout'
      })
      .otherwise({
        redirectTo: '/'
      });

    });

})();