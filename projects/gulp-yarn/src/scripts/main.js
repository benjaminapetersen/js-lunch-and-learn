'use strict';

let add = require('./add.js'),
    _ = require('lodash');

console.log('main.js', add(2,3)); // main.js 5
console.log(_.map([1,2,3], function(num, index, list) {
  // get the next item, but if at the end, go back to beginning
  let next = list[index + 1] || list[0];
  // just make a map of added numbers
  return num + next;
}));
