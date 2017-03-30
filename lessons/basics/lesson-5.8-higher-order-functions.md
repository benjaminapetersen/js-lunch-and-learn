# Higher order functions

Higher order functions are just functions that take other functions as arguments.  
This is very common in JavaScript, you use them all the time!

A few examples:

```JavaScript
// forEach is higher order, to do anything useful, you must give it another function.
[].forEach(function() {

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

each([1,2,3], function(num) {
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
