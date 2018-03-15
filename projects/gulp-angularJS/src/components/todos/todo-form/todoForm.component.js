'use strict';

angular
  .module('todoApp')
  .component('todoForm', {
    bindings: {
      onSubmit: '&'
    },
    templateUrl: 'components/todos/todo-form/todo-form.html',
    controller: function() {
      var $ctrl = this;

      $ctrl.newTodo = {
        text: ''
      };

      $ctrl.submit = function(e) {
        console.log('form', $ctrl.newTodo);
        $ctrl.onSubmit($ctrl.newTodo);
      }
    }
  });
