# Functions

MDN on [functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

MDN [exhaustive reference on functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions)

Functions are likely the most important building block in JavaScript.  A function basically is a set of
statements that perform some work, optionally return a value, and can be called repeatedly.

## Defining

We discussed functions briefly in [lesson 2](./lesson-2.md), briefly touching on function declarations
and function expressions. A simple function definition looks like many of the other constructs we
have already discussed:

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
The above function is named.  This is a divergence from the other statements we have discussed.  
You don't name your loops, but you can optionally name your functions.  Unnamed functions are
anonymous, and most useful when stored in a variable:

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

There is a difference between defining a function and calling it. When you define a function,
you are essentially grouping a set of actions in a way that allows them to easily be performed
multiple times, possibly with different inputs (and thus producing a different output).

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

// ASIDE, pretty strange...
// anonymous block, this could replace the IIFE,
// so long as you use `let` and do not use `var`
// (though its still weird!)
{
  2;
  2 + 2;
  function bar() {console.log('wheeeee!')}
  bar();
  let foo = function() { console.log('its a foo, with a let, in a anonymous block, wleeeeee'); }
}

bar();
foo();

```


### Homework

As before, use `node filename.js` to run your homework.  Wrapping the answer to each question in an IIFE will
be helpful:

```JavaScript
'use strict';
/* jshint esversion: 6 */
// oh, and we will talk about IIFE next week. :)
(function() {
  // Answer to Q1:
})();

// then run your homework:
// $ node ./my-lesson-5-homework.js
```

First, try to solve each problem as outlined.  If that comes easily, think about edge cases and update your functions to handle things like unexpected inputs (arguments).

1. Create a function called `larger`, it should take 2 arguments and return the larger.
  BONUS: create a function called `largest`, it should return the largest of any number of arguments provided.

1. Create a function `isVowel` that returns `true` if an argument is a vowel, and `false` if it is not.

1. Create a function called `sum` that will take an array of numbers & return the total of all of those numbers added together.
  BONUS: update `sum` to take either an array, or a set of individual arguments (`sum([1,2,3])` or `sum(1,2,3,4,6)`)

1. Create a function called `reverse` that takes a string, and returns a reverse copy of the string.

1. Create a function `longestWord` that takes an array of words and returns the number of characters in the longest word.

1. Create a function `upcase` that takes a string & returns all words in the string in uppercase.

    ```JavaScript
      upcase('foo');  // Foo
      upcase('foo bar baz');  // Foo Bar Baz
    ```

1. Create a function called `first`.  It should return the first item in a provided array.

1. Create a function called `last`. It should return the last item in a provided array.

1. Create a function called `nth`.  It should take an array and a number, returning the item in the
array at the index of the number.

1. Create a function called `initial` that takes an array and returns a new array of all EXCEPT the last item in
the original array.
