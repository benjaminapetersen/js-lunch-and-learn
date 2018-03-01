'use strict';

// use the getter to get our module
angular
  .module('todoApp')
  // so we can tack on a component
  .component('todoList', {
    templateUrl: 'components/todos/todo-list/todo-list.html',
    controller: function() {
      // any property we add to the controller will be
      // available in the view
      let ctrl = this;
      // so, lets hard-code some todo items
      // this is nice and all, but who wants hard-coded
      // data? we should ask for this from a server or
      // something, eh?
      ctrl.todos = [{
        text: 'Say hi'
      }, {
        text: 'Buy milk'
      }, {
        text: 'Buy eggs'
      }, {
        text: 'Go to work'
      }];


      console.log(ctrl.todos);
    }
  });
