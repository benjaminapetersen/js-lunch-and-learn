# More Functions!

Now that we have covered the basics, we can dive into some of the stranger aspects of functions.

## Immediately Invoking Functions...

There is a case when an anonymous function is not saved in a variable.  It is a bit of a complicated construct, but I'm gonna
share it now as I'm certain you have seen it:

```JavaScript
// The IIFE: Immediately Invoked Function Expression
// also called the Self Executing Function, Self Executing Anonymous Function, etc.
(function() {

})();

// may take arguments, which are passed immediately:
(function(a,b,c) {

})(1,2,3);

// this is equivalent to the following:
let foo = function(a,b,c) {

}
foo(1,2,3);

// BUT this is invalid:
function() {

}();
// NOTE: this is off topic but perhaps interesting :)
// WHY? because the parens here are treated as grouping operators, not invokers.
// This is a function declaration, and therefore the first ( following is an unexpected token... its not valid.
// You need to transform the declaration into an expression for this to be valid.  How?
// lots of ways, using the same operators you can use on numbers:
// on numbers:
//   (1)   // 1
//   +1    // 1
//   -1    // -1
//   ~1    // -1
//   !1    // false
// on functions:
//   (function() { })();
//   (function() {}());  // uh, same kinda?
//   !function() {}();
//   +function() {}();
//   ~function() {}();
//   void function() {}();
//   true && function() {}();
//   var strange = function() {}();
//   0, function() {}();
//   new function() {}  // doesn't even need the parens, but works the same way.
// what is this doing?
// JavaScript has a parser. it is ok with invoking an expression, it is not ok with invoking a declaration (immediately)
// so, the () are the least weird (maybe) way to trick/tell the parser that this function is a one-off, and we just want to
// run it asap. The +,!, etc identifiers all work as well, they are, in the end, parser signals.
//
// yay?  back to the show...
//
// wait... but WHY? Why would we do this?
// - bubbles.  thats why.
// - functions create a context, an execution scope.
// - what happens inside a function, stays inside a function... unless you `return` it
// - we can run code & create vars w/o having them automatically attach to the window object (become a global :/)
// - we don't care about the function itself, its a bubble, and it can disappear.  but we do care that some work gets done,
//   without leaving a trace behind (unless we intentionally want to leave a trace)
//
// ok, for reals, back to normal function usage
```
If you want more on the IIFE, I can recommend [this post](http://benalman.com/news/2010/11/immediately-invoked-function-expression/).


## Function Expressions

Back to the function expression:

```JavaScript
let square = function square(num) {
  return num * num;
}

// Less common, but
// sometimes you want to name your expression for RECURSION.
// Recursion is simply when a function can call itself...
// and inception style is OK, dreams within dreams within dreams...
// a recursive function can call itself any number of times, provided it isn't infinite
// (because infinite loops are bad)
// remember this? way back when... a factorial of a number goes like this:
// factorial(4) => 4*3*2*1  => 24
// factorial(3) => 3*2*1    => 6
// factorial(2) => 2*1      => 2
let factorial = function fac(number) {
  return number < 2 ?
    1 :
    number * fac(number -1);
};
console.log(factorial(3));

```

We will likely touch on recursion more in the future.

More commonly, you will use a function expression to pass the function to another function.  This happens all the time in JS:

```JavaScript
// .map() is a function [method] of arrays, and it takes a function as a parameter.
[1,2,3,4].map(function(num, i) {
  console.log(num * 2, i);
});

// NOTE: this is the same thing.
// fat arrow functions have been introduced with es6 and are common in React and other modern
// frameworks, even though es6 isn't supported in all browsers (yet)
[1,2,3,4].map((num, i) => {
  console.log(num * 2, i);
});

// libs like lodash also use function expressions:
_.map([1,2,3,4], function(num, i) {
  console.log(num * 2, i);
});

```
