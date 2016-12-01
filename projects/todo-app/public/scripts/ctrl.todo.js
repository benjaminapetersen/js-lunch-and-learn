'use strict';

angular
  .module('todoApp')
  .controller('ctrl.todo', [
    '$scope',
    'todo',
    function($scope, todo) {
      $scope.alerts = [];
      todo
        .get()
        .then(function(resp) {
          $scope.todos = resp.data;
        }, function(err) {
          $scope.alerts.push(err);
        });
    }
  ]);
