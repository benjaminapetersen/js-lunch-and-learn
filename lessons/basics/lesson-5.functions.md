# Functions

MDN on [functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

MDN [exhaustive reference on functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)

Functions are likely the most important building block in JavaScript.  A function basically is a set of
statements that perform some work, optionally return a value, and can be called repeatedly.

## Defining

We discussed functions briefly in [lesson 2](./lesson-2.md), briefly touching on function declarations and function expressions.
A simple function definition looks like many of the other constructs we have already discussed:

```JavaScript
function(/* arguments */) {

}

for(/* conditions */) {

}

while(/* condition */) {

}
// etc
```
A simple example function with a return statement:

```JavaScript
// named function, which is a function declaration
function square(num) {
  return num * num;
}
```
The above function is named.  This is a divergence from the other statements we have discussed.  You don't name your loops, but
you can optionally name your functions.  Unnamed functions are anonymous, and most useful when stored in a variable:

```JavaScript
// an anonymous function, which is a function expression
// it is an "expression" because it evaluates to a single value (the function itself) and is stored in the variable
let square = function(num) {
  return num * num;
}
```

And of course, you can use both forms:

```JavaScript
// we can assign the variable named square's value to be the square function
let square = function square(num) {
  return num * num;
}

```

## Calling functions

There is a difference between defining a function and calling it. When you define a function, you are essentially grouping
a set of actions in a way that allows them to easily be performed multiple times, possibly with different inputs (and thus
producing a different output).

Parens are used to execute/call a function:
```JavaScript
square(4);
```

Functions can only be called if they are defined in the same scope as the place where they are called.

```JavaScript
(function() {  
  square(4); // this won't work. `square` is undefined at this point in the code...
})();

(function() {  
  function square(num) { return num * num };
  square(4); // works.
})();

(function() {  
  square(4); // still works, because the declaration is hoisted.
  function square(num) { return num * num };
})();

(function() {  
  square(4); // ah, no worky. the variable `square` is hoisted in this case, but it isn't assigned to a function until later...
  let square = function(num) { return num * num };
})();

let square = function(num) { return num * num };
(function() {  
  square(4); // works. functions in an outer scope can be referenced & called.  just not in a sibling or child/grandchild/etc scope
})();

```
What is function scope?  Basically it is:
- The parent function, in which the called function has been declared
- The window, or global scope, if the function has been declared as a top level function


### Arguments

Functions can take any object, even another function, as an argument.

```JavaScript
var callItOrReturnIt = function(it) {
  return (typeof it === 'function') ?
    it() :
    it;
}
console.log( callItOrReturnIt(1) );
console.log( callItOrReturnIt('foo') );
console.log( callItOrReturnIt({ jQuery: 'does this a lot!'}) );
console.log( callItOrReturnIt(function() { return 42;  }) );

```

Functions as arguments is a bit unique.  Functions are first class objects in JavaScript, which is what provides this capability.
Higher Order Functions are what we can functions that take other functions as their arguments.  

So, lets make a few higher order functions, then pass functions as arguments:

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





## Homework

As before, use `node filename.js` to run your homework.  Wrapping the answer to each question in an IIFE will
be helpful:
```JavaScript
// oh, and we will talk about IIFE next week. :)
(function() {
  // Answer to Q1:
})();
```

First, try to solve each problem as outlined.  If that comes easily, think about edge cases and update your functions
to handle things like unexpected inputs (arguments).

1. Create a function called `larger`, it should take 2 arguments and return the larger.
  BONUS:

1. Create a function called `first`.  It should return the first item in a provided array.

1. Create a function called `last`. It should return the last item in a provided array.

1. Create a function called `nth`.  It should take an array and a number, returning the item in the
array at the index of the number.

1.  Create a function called `indexOf`.  It should take an array, and a second object.  It will loop the array to check and
see if any of the items in the array match the second object.  If so, it returns the index (number) of that item.

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
