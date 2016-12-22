(function() {

  'use strict'

  /**
   * The factory provides user related functionality
   * 
   * @module profilerApp
   * @factory User
   */
  angular.module('profilerApp')
    .factory('User', function ($http, $location) {

      var isRegistered = false;

      return {

        /**
         * Initializes predefined user collection from JSON file
         */
        initializeUsers: function() {

          $.getJSON('collection/preusers.json', function(response) {
            if (localStorage.getItem('TcProfilerApp2017_users') === null) {
              localStorage.setItem('TcProfilerApp2017_users', JSON.stringify(response));
            }
          });

        },

        /**
         * Registers a new user to localStorage by adding it to stringified JSON array
         * 
         * @param  {Object} newUser - user to register
         */
        registerUser: function(newUser) {

          var usersList, usersListCopy = [];

          if ( localStorage.getItem('TcProfilerApp2017_users') !== null ) {
            usersList = JSON.parse(localStorage.getItem('TcProfilerApp2017_users'));
            usersListCopy = usersList;
          }  

          usersListCopy.push(newUser);

          localStorage.setItem('TcProfilerApp2017_users', JSON.stringify(usersListCopy));
          isRegistered = true;
          $location.path('/');
        },

        /**
         * Returns User {Object} with provided credentials 
         * 
         * @param  {string} email    
         * @param  {string} password 
         * 
         * @return {Object} User  
         */
        getUserWithLoginCredentials: function(email, password) {

          var userWithCredentials = null;
          var isLoopActive = true;

          angular.forEach(this.getUsersJsonList(), function(user) {

            if(isLoopActive) {
              if (user.email === email && user.password === password) {
                userWithCredentials = user;
                isLoopActive = false;
              }
            }

          });

          return userWithCredentials;
        },

        /**
         * Returns User {Object} with specific id
         * 
         * @param  {Number} sessionId - unique user id
         * 
         * @return {Object} userWithSessionId - founded user
         */
        getUserWithSessionId: function(sessionId) {

          var userWithSessionId = null;
          var isLoopActive = true;

          angular.forEach(this.getUsersJsonList(), function(user) {

            if(isLoopActive) {
              if (user.id == sessionId) {
                userWithSessionId = user;
                isLoopActive = false;
              }
            }

          });

          return userWithSessionId;
        },

        /**
         * Returns user list from localStorage item
         * 
         * @return {Array} - json array
         */
        getUsersJsonList: function() {
          return JSON.parse(localStorage.getItem('TcProfilerApp2017_users'));
        },

        /**
         * Searches for an index in localStorage that needs to be updated and 
         * setting up new values for the User
         * 
         * @param  {Object} userToUpdate - user that needs an update
         */
        editUser: function(userToUpdate) {

           var usersList = JSON.parse(localStorage.getItem('TcProfilerApp2017_users'));
           var indexOfUserToUpdate;

           usersList.find(function(item, index){
             if(item.id=== userToUpdate.id){
               indexOfUserToUpdate = index;
             }
           });

           usersList.splice(indexOfUserToUpdate, 1);
           usersList.push(userToUpdate);

           localStorage.setItem('TcProfilerApp2017_users', JSON.stringify(usersList));
        },

        /**
         * Returns boolean that tell us whether the User is being registered at current
         * session
         * 
         * @return {Boolean} isRegistered - recently registered or not
         */
        isReadyToLogin: function() {
          return isRegistered;
        }
      };

    });

})();