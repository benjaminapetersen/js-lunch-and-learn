// todoPage.component.js
'use strict';

angular
  .module('todoApp')
  .component('todoPage', {
    templateUrl: 'components/todo-page/todoPage.html',
    controller: [
      '$http',
      'locations',
      function($http, locations) {
        let $ctrl = this;

        $ctrl.onNewTodo = function(item) {
          console.log('page', item);
        };

        $ctrl.$onInit = function() {
          console.log('initialize....');
          $http
            .get(locations.todos)
            // test a wrong path.
            //.get('foo/bar/baz')
            .then(
              (resp) => {
                $ctrl.todos = resp.data;
              },
              (err) => {
                $ctrl.errors = [
                  err.data
                ];
              });
        }
      }]
  });
