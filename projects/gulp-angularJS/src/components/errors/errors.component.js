'use strict';

angular
  .module('todoApp')
  .component('errors', {
    bindings: {
      errors: '<'
    },
    templateUrl: 'components/errors/errors.html'
  })
