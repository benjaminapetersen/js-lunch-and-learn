//
// Lesson 1:
// This file exercises the basics of each of the objects we
// will be working with.  We will explore a few gotchas, like
// why JSON.stringify() is needed to persist objects to
// localStorage.
// -------------
// $
// localStorage
//   .setItem(id, data);
//   .getItem(id);
// setTimeout()
// JSON
//   .stringify()
//   .parse()
//
//
$(function() {
  'use strict';


  // localStorage
  // - super simple way to make some data persistent

  // dummy data to use
  var data = {
    firstName: 'John',
    lastName: 'Doe',
    age: 36
  };

  var stringified = JSON.stringify(data);

  // lets compare them both in the console...
  console.log('original',            data);
  console.log('stringified',         stringified);

  var key = 'johnData';

  // save John to localStorage
  localStorage.setItem(key, stringified);



  setTimeout(function() {

    // make a div into a jQuery object
    var $output = $('.output');

    // get the string out of localStorage
    var stuffFromLocalStorage = localStorage.getItem(key);

    // now, parse the string into an object again
    var parsed = JSON.parse(stuffFromLocalStorage);

    console.log('from storage', stuffFromLocalStorage);
    console.log('parsed', parsed);

    // write the data to the div (using jQuery)
    $output.html(parsed);  // no longer works.........

  }, 500); // half a second

});
