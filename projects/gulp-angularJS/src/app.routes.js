'use strict';

// NOTE: many component based architectures do NOT
// have external routes like this, but will put the
// routes within components that own the route.
angular
  .module('todoApp')
  // config lets you configure the app before it runs.
  .config(($routeProvider) => {
    $routeProvider
      .when('/', {
        redirectTo: 'todos'
      })
      .when('/todos', {
        //template: '<todo-list></todo-list>',
        template: '<todo-page></todo-page>'
      })
      .otherwise({
        redirectTo: 'todos'
      });
  });
