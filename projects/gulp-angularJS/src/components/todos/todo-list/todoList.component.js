'use strict';

angular
  .module('todoApp')
  .component('todoList', {
    templateUrl: './todo-list.html',
    controller: () => {
      console.log('hello world?');
    }
  });
