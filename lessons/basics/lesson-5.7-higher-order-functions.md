# Higher order functions

Higher order functions are just functions that take other functions as arguments.  
This is very common in JavaScript, you use them all the time!

A few examples:

- [Eloquent JavaScript on higher order functions](http://eloquentjavascript.net/05_higher_order.html)


## Examples

### forEach, each

```JavaScript
// forEach is higher order function. Its job is to iterate, nothing more.  To do
// anything useful, you must pass it another function responsible for the action work.
// So why use a higher order function like .forEach() instead of a `for` or `while` loop?
// Because it `abstracts` away the details of iteration, making your code more clear
// and declarative.  Declarative is a word we use to describe code that states *what* it
// wants to do, rather than *how* to do it.  Abstracting code hides away some of the *how*,
// usually the noise that isn't actually relevant to the task you are attempting to accomplish.
// For instance, a for loop:
// for(var i=0; i<arr.length; i++) {
//    do stuff with arr[i]
// }
// There is a TON of noise in a for loop that has nothing to do with your actual logic.
// Now, consider .forEach():
[].forEach(function(item, i) {
  // do stuff
});
// or with a fat arrow fn:
[].forEach((item, i) => {

});

// Much better! rather than messing with arr[i], you can use a variable `item` for
// each iteration of the loop.  In addition, the function() {} allows you to declare
// local variables, which is not possible in a for loop (until es6, which gives us `let`).
//

```

### map

Map is an even better example. In order to create a new array from a previous array
using a `for` loop, we have to do the following:

```Javascript
// our starter array:
let arr = [1,2,3,4,5];

// now, we can map:
let newArr = [];
for(var i=0; i<arr.length; i++) {
  newArr[i] = (arr[i] * 2);
}
return newArr;

// Thats noisy... we are responsible for declaring the new array, manually iterating,
// making sure we don't accidentally change the iterator `i` which would cause us to
// potentially miss an item in our array or WORSE, cause an infinite loop, etc.
//
// how about:
let newArr = arr.map(function(item) {
  return item * 2;
});
// fat arrow (can auto return *if* just one expression!):
let newArr = arr.map((item) => {
  item * 2;
});
// much more clear.  This code describes what it is doing to the reader.  It takes much
// less time to digest, and it is much safer, it won't infinite loop, you can still
// create local variables, etc.
```

### find

Manually doing a find, vs using find. The job of `find` is to search through an array and
find some item that matches

```JavaScript
// our starter array:
let arr = [
  {name: 'bob'},
  {name: 'betty'},
  {name: 'betsy'}
];

let found;
for(var i=0; i<arr.length; i++) {
  if(arr[i].name === 'betsy') {
    found = arr[i];
  }
}
// found will be an item, or it will be undefined

// vs:
arr.find(function(item) {
  return item.name === 'betsy';
});
// fat arrow (can auto return *if* just one expression!):
arr.find((item) => {
  item.name === 'betsy';
});

```


So, lets *make* a few of our own higher order functions, then pass functions as arguments:

```JavaScript

// We could use _.each(), [].forEach, $.each() or any number of other iterator functions.  
// Instead, lets make one.
// We know how the above functions work, ours should act the same way.

let each = function(arr, fn) {
  let length = arr.length;
  let i;
  for(i = 0; i < length; i++) {
    fn(arr[i], i, arr);
  }
};

each([1,2,3], (num) => {
  console.log(num * 2); // 2,4,6
});  

```




### Homework


As before, use `node filename.js` to run your homework.  Wrapping the answer to each question in an IIFE will
be helpful:
```JavaScript
// oh, and we will talk about IIFE next week. :)
(function() {
  // Answer to Q1:
})();

// then run your homework:
// $ node ./my-lesson-5-homework.js


1. We created our own `each()` function above.  It is the simplest iterator, all it does is cycle through an array calling
    a provided function once for each item in the array, passing the item, the index, and the original array as the three
    arguments.
    Write your own version of `map`:
    ```JavaScript
    // map does a few things:
    // - it takes 2 arguments:
    //   - an array
    //   - a callback function
    // - it returns a new array
    // - it calls the callback function once per iteration over the array with each of the following:
    //   - the item for this current iteration
    //   - the iterator index
    //   - the original array (least used, but still provided)
    let map;

    // call it:
    // var doubled = map([1,2,3], function(num, i, arr) { return num * 2;  });
    // be sure to test your fn a few other ways!
    ```

1.  Once you have `map` figured out, write a `find` function:

  ```JavaScript
    // find does the following:
    // - it takes 2 arguments:
    //   - an array
    //   - a callback function
    // - find returns one and only one object. It returns:
    //   - the first object in the array that the callback returns `true` for.
    let find;

    // call it:
    // var found = find(['dog', 'cat', 'duck', 'kitten'], function(item, i, arr) { return item === 'kitten'; });
    // console.log(found);
    // be sure to test your fn a few other ways!
  ```

2. Just like in [5.2.2](lesson-5.2.2.constructors-and-classes.md) we made a simple `jQuery` clone,
lets collect our little set of iterators into a `lodash` clone.  Add to your `map` and `find`
the following individual functions:

- each
- map
- find
- contains
- first
- last
- size
- filter
- every
- some
- reduce  

Then, collect them all under one global variable, `_` (or whatever you want to call your library).

We will keep working towards having a small set of our own little tools (libs) that we can
eventually use to build a simple app.  
