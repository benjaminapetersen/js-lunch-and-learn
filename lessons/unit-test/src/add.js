'use strict';

// add(2,3)  args = [2,3]
// add(1,2,3,4,5)  args = [1,2,3,4,5];
var add = function() {
  var args = Array.prototype.slice.call(arguments);


  var sum = 0;

  for(var i = 0; i < args.length; i++) {
    sum += args[i];
  }

  return sum;

};
