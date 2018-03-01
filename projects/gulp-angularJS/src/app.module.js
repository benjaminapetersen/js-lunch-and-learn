'use strict';

angular
  .module('todoApp', [
    'ngRoute'
  ])
  .constant('locations', {
    todos: '__mocks__/todos.json',
    // users: '__mocks__/users.json',
    // fooo: '__mocks__/foo.json'
  })
