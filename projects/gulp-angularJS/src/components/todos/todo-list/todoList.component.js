'use strict';

// use the getter to get our module
angular
  .module('todoApp')
  // so we can tack on a component
  .component('todoList', {
    bindings: {
      todos: '<' // wtf.
    },
    templateUrl: 'components/todos/todo-list/todo-list.html',
    controller: function() {
      // any property we add to the controller will be
      // available in the view
      let ctrl = this;


      console.log(ctrl.todos);
    }
  });
