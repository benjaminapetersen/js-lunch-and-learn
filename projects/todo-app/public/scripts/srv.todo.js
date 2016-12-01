'use strict';

angular
  .module('todoApp')
  .factory('todo', [
    '$http',
    function($http) {
      var basePath = 'http://localhost:3001/',
          todosPath = basePath + 'todos';

      return {
        get: function() {
          return $http.get(todosPath);
        },
        post: function() {},
        put: function() {},
        delete: function() {}
      };

    }]);
