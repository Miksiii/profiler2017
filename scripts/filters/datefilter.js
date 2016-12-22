(function() {

  'use strict';

  angular.module('profilerApp')
    .filter('humanizeDateFormat',['$filter',  function($filter) {

        /**
         * Grabs the date format provieded for each object and format it to 
         * match the specified pattern
         *
         * dd / M / yyyy / HH:mm:ss
         * 05 / 06 / 2015 / 21:23:45
         * 
         * @param  {Object} dateToFormat - Date Object to format
         */
        return function(dateToFormat) {
            return $filter('date')(dateToFormat, 'dd / M / yyyy / HH:mm:ss');
        };
    }]);

})();
